import { useEffect, useState, useRef } from 'react';
import { getUsersForTask } from '../../../services/task-service';
import socialSkillService from '../../../services/socialSkill-service';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment'; // Pour la date
import espritLogo from '../../../../public/assets/images/esprit.png';
import { getChecklistScoreForUser } from '../../../services/checklist-service';


function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [socialPoints, setSocialPoints] = useState({});
  const [TaskPoints, setTaskPoints] = useState({});
  const [nbrTasksPoints, setNbrTasksPoints] = useState({});
  const leaderboardRef = useRef(null);

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
          const checklistResult = await getChecklistScoreForUser(user._id);

          let socialScore = 0;
          if (socialResult.message.length === 0) {
            socialScore = 1; // Valeur par défaut
          } else {
            socialResult.message.forEach((skill) => (socialScore += skill.pointSocial));
          }
          socialScores[user._id] = socialScore;

          let taskScore = checklistResult.data.message.somme || 1;
          let nbrTasks = checklistResult.data.message.numberOfTasks || 0;

          taskScores[user._id] = taskScore;
          nbrTasksScores[user._id] = nbrTasks;
        })
      );

      setSocialPoints(socialScores);
      setTaskPoints(taskScores);
      setNbrTasksPoints(nbrTasksScores);
    };

    fetchUsers();
  }, []);

  // Filtrer les utilisateurs selon le terme de recherche
  const filteredUsers = users.filter((user) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      user.name.toLowerCase().includes(searchLower) ||
      user.role.toLowerCase().includes(searchLower) ||
      (user.rang && user.rang.toString().toLowerCase().includes(searchLower))
    );
  });

  // Trier les utilisateurs selon le score final décroissant
  const sortedUsers = filteredUsers.sort((a, b) => {
    const scoreA = (socialPoints[a._id] || 0) + (TaskPoints[a._id] || 0);
    const scoreB = (socialPoints[b._id] || 0) + (TaskPoints[b._id] || 0);
    return scoreB - scoreA; // Tri décroissant
  });

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Format A4
    pdf.text("Leaderboard des professeurs", 10, 20); // Titre
    pdf.text(`Date du jour: ${moment().format('DD/MM/YYYY')}`, 10, 30); // Date
  
    pdf.setFont("Helvetica", "bold");
    pdf.text("Formule pour le Score des tâches:", 10, 40);
    pdf.setFont("Helvetica", "normal");
    pdf.text("Score des tâches = somme des points obtenus dans les tâches", 10, 45);
    pdf.text("Nombre de tâches = nombre total de tâches effectuées", 10, 50);
  
    pdf.setFont("Helvetica", "bold");
    pdf.text("Formule pour le Score final:", 10, 55);
    pdf.setFont("Helvetica", "normal");
    pdf.text("Score final = Points sociaux + Score des tâches", 10, 60);
  
    const tableData = sortedUsers.map((user, index) => [
      index + 1, // Rang
      user.name,
      user.role,
      socialPoints[user._id] || 0, // Points sociaux
      `${TaskPoints[user._id] || 0} (${nbrTasksPoints[user._id] || 0})`, // Score des tâches avec nombre de tâches
      (socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0), // Score final
    ]);
  
    pdf.autoTable({
      startY: 70, // Position du tableau
      head: [['Rang', 'Nom', 'Rôle', 'Points sociaux', 'Score des tâches(/nbrTasks)', 'Score final']],
      body: tableData,
    });
  
    const logoWidth = 30;
    const logoHeight = 30;
    const logoX = pdf.internal.pageSize.getWidth() - logoWidth - 10; // 10 mm du bord droit
    const logoY = 10; // 10 mm du bord supérieur
    pdf.addImage(espritLogo, 'PNG', logoX, logoY, logoWidth, logoHeight);
  
    const pdfFileName = `Leaderboard_${moment().format('DDMMYYYY')}.pdf`; // Nom du fichier PDF
    pdf.save(pdfFileName); // Télécharger le PDF avec le nom formaté
  };
  



  const downloadUserPDF = (user) => {
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.setFont("Helvetica", "bold"); 
    pdf.text(`Données de l'utilisateur: ${user.name}`, 10, 20);
    pdf.setFont("Helvetica", "normal"); 
    pdf.text(`Rôle: ${user.role}`, 10, 30);
    pdf.text(`Points sociaux: ${socialPoints[user._id] || 0}`, 10, 40);
    pdf.text(`Score des tâches: ${TaskPoints[user._id] || 0}`, 10, 50);
    pdf.setFont("Helvetica", "bold"); 
    pdf.text(`Score final = Points sociaux + Score des tâches = ${(socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0)}`, 10, 60);

    const pdfFileName = `Données_${user.name}_${moment().format('DDMMYYYY')}.pdf`;
    pdf.save(pdfFileName);
  };

  return (
    <div>
      <h1 className="h2 mb-3 text-center">Leaderboard</h1>

      <div className="row">
        <div className="col">
          <InputGroup className="col-md-12 d-flex flex-row justifiez-content-end">
            <InputGroup.Text>🔎</InputGroup.Text
            ><Form.Control
              placeholder="Rechercher Par NOM ou ROLE ..."
              aria-label="Rechercher Par NOM ou ROLE ..."
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </InputGroup>
        </div>

        <div className="col"></div>

        <div className="col">
          <Button variant="primary" onClick={downloadPDF}>
            Télécharger en PDF
          </Button>
        </div>
      </div>

      <br />
      <br />
      <br />

      <div ref={leaderboardRef}>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className='text-center'>Rang 🏆</th>
              <th className='text-center'>Nom 🙎‍♂️</th>
              <th className='text-center'>Rôle 💼</th>
              <th className='text-center'>Points sociaux 🗣️</th>
              <th className='text-center'>Score des tâches(/nbrTasks) 📋</th>
              <th className='text-center'>Score Final 🎯</th>
              <th className='text-center'>Download 📥</th>
            </tr>
          </thead>
          <tbody>
            {sortedUsers.map((user, index) => (
              <tr key={index}>
                <td className='text-center'>{index + 1}</td>
                <td className='text-center'>{user.name}</td>
                <td className='text-center'>{user.role}</td>
                <td className='text-center'>{socialPoints[user._id] || 0}</td>
                <td className='text-center'>{TaskPoints[user._id] || 0}(/ {nbrTasksPoints[user._id]})</td>
                <td className='text-center'>{(socialPoints[user._id] || 0) + (TaskPoints[user._id] || 0)}</td>
                <td className='text-center'><Button variant="secondary" onClick={() => downloadUserPDF(user)}>
                    Télécharger
                  </Button> {/* Bouton de téléchargement */}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Leaderboard;
