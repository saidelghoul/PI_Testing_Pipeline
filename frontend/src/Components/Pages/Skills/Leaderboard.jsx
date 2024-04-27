import { useEffect, useState, useRef } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { getUsersForTask } from '../../../services/task-service';
import socialSkillService from '../../../services/socialSkill-service';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import espritLogo from '../../../../public/assets/images/esprit.png';
import { getChecklistScoreForUser } from '../../../services/checklist-service';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [socialPoints, setSocialPoints] = useState({});
  const [TaskPoints, setTaskPoints] = useState({});
  const [nbrTasksPoints, setNbrTasksPoints] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      const listUsers = await getUsersForTask();
      setUsers(listUsers.data.message);

      const socialScores = {};
      const taskScores = {};
      const nbrTasksScores = {};

      await Promise.all(
        listUsers.data.message.map(async (user) => {
          const socialResult = await socialSkillService.getSocialSkillsByUser(user._id);

          let socialScore = 0;
          const socialSkills = Array.isArray(socialResult.socialSkills) ? socialResult.socialSkills : [];
          socialSkills.forEach((skill) => {
            socialScore += skill.pointSocial || 0; // Additionner les points sociaux
          });

          socialScores[user._id] = socialScore;

          const checklistResult = await getChecklistScoreForUser(user._id);
          const taskScore = checklistResult.data.message.somme || 1;
          const nbrTasks = checklistResult.data.message.numberOfTasks || 0;

          taskScores[user._id] = taskScore;
          nbrTasksScores[user._id] = nbrTasks;
        })
      );

      setSocialPoints(socialScores);
      setTaskPoints(taskScores);
      setNbrTasksPoints(nbrTasksScores);
    };

    fetchUsers(); // Appeler la fonction de récupération des utilisateurs
  }, []); // Exécuter lors du montage du composant

  // Filtrer les utilisateurs selon le terme de recherche
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower)
    );
  });

  // Trier les utilisateurs selon le score final décroissant
  const sortedUsers = filteredUsers.map((user) => ({
    ...user,
    socialScore: socialPoints[user._id] || 0,
    taskScore: TaskPoints[user._id] || 0,
    finalScore: (socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0),
  })).sort((a, b) => b.finalScore - a.finalScore); // Tri décroissant par score final

  const imageUrl = (userId, user) =>
    userId && user && user.profileImage
      ? `http://localhost:8000/user/${userId}/profile`
      : "/assets/images/resources/user-pro-img.png"; // Image par défaut

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Format A4
    pdf.text("Leaderboard des professeurs", 10, 20); // Titre
    pdf.text(`Date du jour: ${moment().format('DD/MM/YYYY')}`, 10, 30); // Date actuelle
    
    pdf.setFont("Helvetica", "bold");
    pdf.text("Formule pour le Score des tâches:", 10, 40);
    pdf.setFont("Helvetica", "normal");
    pdf.text("Score des tâches = somme des points obtenus dans les tâches", 10, 45);
    
    pdf.setFont("Helvetica", "bold");
    pdf.text("Formule pour le Score final:", 10, 55);
    pdf.setFont("Helvetica", "normal");
    pdf.text("Score final = Points sociaux + Score des tâches", 10, 60);
    
    pdf.autoTable({
      startY: 70, // Position du tableau
      head: [['Rang', 'Nom', 'Rôle', 'Points sociaux', 'Score des tâches(/nbrTasks)', 'Score final']],
      body: sortedUsers.map((user, index) => [
        index + 1, // Rang
        user.name,
        user.role,
        socialPoints[user._id] || 0, // Points sociaux
        `${TaskPoints[user._id] || 0} (/ ${nbrTasksPoints[user._id] || 0})`, // Score des tâches
        (socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0), // Score final
      ]),
    });
    
    // Ajouter le message de confidentialité en rouge en bas à droite
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setTextColor(255, 0, 0); // Rouge
    pdf.text("Ces données sont strictement confidentielles !", 10, pageHeight - 10);

    const logoWidth = 30;
    const logoHeight = 30;
    pdf.addImage(espritLogo, 'PNG', 180, 10, logoWidth, logoHeight); // Positionner le logo
    
    const pdfFileName = `Leaderboard_${moment().format('DDMMYYYY')}.pdf`; // Nom du fichier PDF
    pdf.save(pdfFileName); // Télécharger le PDF
  };


  const downloadUserPDF = async (user) => {
    const pdf = new jsPDF({
      orientation: 'l', // 'l' pour paysage
      unit: 'mm',
      format: 'a4', // Format A4
    });
  
    pdf.setFont("Helvetica", "bold");
    pdf.text(`Données de l'utilisateur: ${user.name}`, 10, 20);
    pdf.setFont("Helvetica", "normal");
    pdf.text(`Rôle: ${user.role}`, 10, 30);
    pdf.text(`Points sociaux: ${socialPoints[user._id] || 0}`, 10, 40);
    pdf.text(`Score des tâches: ${TaskPoints[user._id] || 0}`, 10, 50);
  
    pdf.setFont("Helvetica", "bold");
    pdf.text(`Score final = Points sociaux + Score des tâches = ${(socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0)}`, 10, 60);
  
    // Récupérer la photo de profil
    const profileImageUrl = `http://localhost:8000/user/${user._id}/profile`; // URL de la photo de profil
    try {
      const response = await axios.get(profileImageUrl, { responseType: 'arraybuffer' }); // Charger l'image
      const base64 = Buffer.from(response.data, 'binary').toString('base64'); // Convertir en base64
      pdf.addImage(`data:image/jpeg;base64,${base64}`, 'JPEG', 180, 10, 30, 30); // Ajouter l'image en haut à droite
    } catch (error) {
      console.error("Erreur lors du chargement de la photo de profil:", error);
      pdf.text("Aucune image de profil disponible", 180, 10); // Si l'image ne peut pas être chargée
    }
  
    // Ajouter le message de confidentialité
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setTextColor(255, 0, 0); // Rouge
    pdf.text("Ces données sont strictement confidentielles !", 10, 10); // Position du message de confidentialité
  
    // Ajouter le logo d'Esprit en bas à droite
    const logoWidth = 120; // Largeur du logo
    const logoHeight = 120; // Hauteur du logo
    const logoX = pdf.internal.pageSize.getWidth() - logoWidth - 120; // 10 mm du bord droit
    const logoY = pageHeight - logoHeight - 10; // 10 mm du bord inférieur
    pdf.addImage(espritLogo, 'PNG', logoX, logoY, logoWidth, logoHeight); // Ajouter le logo d'Esprit

     // Ajouter la date d'aujourd'hui en bas à gauche
  const todayDate = moment().format('DD/MM/YYYY'); // Obtenir la date actuelle
  pdf.setTextColor(0, 0, 0); // Noir
  pdf.text(`le: ${todayDate}`, 10, pageHeight - 20); // Position de la date en bas à gauche
  
    const pdfFileName = `Données_${user.name}_${moment().format('DDMMYYYY')}.pdf`;
    pdf.save(pdfFileName); // Enregistrer le PDF
  };

  
  

  return (
    <div>
      <h1 className="h2 mb-3 text-center">Leaderboard</h1>

      <div className="row">
        <div className="col">
          <InputGroup className="col-md-12 d-flex flex-row justifiez-content-end">
            <InputGroup.Text>🔎</InputGroup.Text>
            <Form.Control
              placeholder="Rechercher par nom ou rôle"
              aria-label="Rechercher par nom ou rôle"
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="col">
          <Button variant="primary" onClick={downloadPDF}>Télécharger en PDF</Button>
        </div>
      </div>

      <br />
      <br />
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            <th className='text-center'>Rang 🏆</th>
            <th className='text-center'>Nom 🙎‍♂️</th>
            <th className='text-center'>Rôle 💼</th>
            <th className='text-center'>Points sociaux 🗣️</th>
            <th className='text-center'>Score des tâches (/nbrTasks) 📋</th>
            <th className='text-center'>Score Final 🎯</th>
            <th className='text-center'>Télécharger 📥</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user, index) => (
            <tr key={index}>
              <td className='text-center'>{index + 1}</td>
              <td className='text-center'>
                <img
                  src={imageUrl(user._id, user)} // Afficher l'image de profil
                  alt={user.name}
                  style={{ width: "30px", height: "30px", borderRadius: "50%" }} // Style de l'image
                />
                {user.name}
              </td>
              <td className='text-center'>{user.role}</td>
              <td className='text-center'>{socialPoints[user._id] || 0}</td>
              <td className='text-center'>{TaskPoints[user._id]} (/ {nbrTasksPoints[user._id]})</td>
              <td className='text-center'>{(socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0)}</td>
              <td className='text-center'>
                <Button variant="secondary" onClick={() => downloadUserPDF(user)}>
                  Télécharger
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default Leaderboard;
