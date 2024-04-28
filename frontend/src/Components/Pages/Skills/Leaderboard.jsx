import { useEffect, useState, useRef, useContext } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { getUsersForTask } from '../../../services/task-service';
import socialSkillService from '../../../services/socialSkill-service';
import { getChecklistScoreForUser } from '../../../services/checklist-service';
import { UserContext } from '../../../../context/userContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import espritLogo from '../../../../public/assets/images/esprit.png';
import oneStar from '../../../../public/assets/images/stars/1Star.jpg'; 
import threeStars from '../../../../public/assets/images/stars/3Stars.jpg';
import fiveStars from '../../../../public/assets/images/stars/5Stars.jpg';
import UserStats, { generatePieChartBase64 } from './UserStats';
import html2canvas from 'html2canvas'; // Assurez-vous que cela est correct
import axios from 'axios';



function Leaderboard() {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [socialPoints, setSocialPoints] = useState({});
  const [TaskPoints, setTaskPoints] = useState({});
  const [nbrTasksPoints, setNbrTasksPoints] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  


  const departmentName = user?.departement || "N/A";
  const uniteName = user?.unite || "N/A";

  // Déterminer si le rôle est "Directeur d'étude"
  const isDirectorOfStudies = user?.role === "Directeur d'étude";
  const isChefDepartement = user?.role === "Chef département";
  const isChefUnite = user?.role === "Chef unité";
  const isEnseignant = user?.role === "Enseignant"

  useEffect(() => {
    const fetchUsers = async () => {
      const listUsers = await getUsersForTask();
      let filteredUsers = listUsers.data.message;
  
      const roleUserActuel = user.role;
      const departmentUserActuel = user.departement;
      const uniteUserActuel = user.unite;
  
      // Conditions de filtrage selon le rôle de l'utilisateur actuel
      if (roleUserActuel === "Directeur d'étude") {
        // Le directeur d'étude voit tout le monde
      } else if (roleUserActuel === 'Chef département') {
        filteredUsers = filteredUsers.filter((usr) => (
          (usr.role === 'Enseignant' || usr.role === 'Chef unité') &&
          usr.departmentDetails?.[0]?.name === departmentUserActuel
        ));
      } else if (roleUserActuel === 'Chef unité') {
        filteredUsers = filteredUsers.filter((usr) => (
          usr.role === 'Enseignant' &&
          usr.departmentDetails?.[0]?.name === departmentUserActuel &&
          usr.uniteDetails?.[0]?.name === uniteUserActuel
        ));
      } else if (roleUserActuel === 'Enseignant') {
        filteredUsers = filteredUsers.filter((usr) => usr._id === user.id);
        console.log("Filtre",filteredUsers);
      }
  
      console.log("Liste finale des utilisateurs filtrés:", filteredUsers);
  
      // Obtenir les scores sociaux, les scores des tâches et les scores finaux
      const socialScores = {};
      const taskScores = {};
      const nbrTasksScores = {};
  
      await Promise.all(
        filteredUsers.map(async (usr) => {
          const socialResult = await socialSkillService.getSocialSkillsByUser(usr._id);
          const socialScore = socialResult.socialSkills.reduce(
            (sum, skill) => sum + (skill.pointSocial || 0),
            0
          );
          socialScores[usr._id] = socialScore * 100;
  
          const checklistResult = await getChecklistScoreForUser(usr._id);
          const taskScore = checklistResult.data.message.somme || 1;
          const nbrTasks = checklistResult.data.message.numberOfTasks || 0;
  
          taskScores[usr._id] = taskScore;
          nbrTasksScores[usr._id] = nbrTasks;
        })
      );
  
      // Calcul du score final pour chaque utilisateur
      const finalUsers = filteredUsers.map((usr) => {
        const finalScore = (socialScores[usr._id] || 0) + (TaskPoints[usr._id] || 0);
        return {
          ...usr,
          finalScore,
        };
      });
  
      // Trouver Xmax et Xmin
      const Xmax = Math.max(...finalUsers.map((usr) => usr.finalScore));
      const Xmin = Math.min(...finalUsers.map((usr) => usr.finalScore));
  
      // Déterminer le rating pour chaque utilisateur
      const ratedUsers = finalUsers.map((usr) => {
        const Fi = (Xmax - usr.finalScore) / (Xmax - Xmin);
        let rating;
        if (Fi >= 0.8) {
          rating = '⭐'; // 5 étoiles
        } else if (Fi >= 0.6) {
          rating = '⭐⭐'; // 4 étoiles
        } else if (Fi >= 0.4) {
          rating = '⭐⭐⭐'; // 3 étoiles
        } else if (Fi >= 0.2) {
          rating = '⭐⭐⭐⭐'; // 2 étoiles
        } else {
          rating = '⭐⭐⭐⭐⭐'; // 1 étoile
        }
  
        return {
          ...usr,
          rating,
        };
      });
  
      setUsers(ratedUsers);
      setSocialPoints(socialScores);
      setTaskPoints(taskScores);
      setNbrTasksPoints(nbrTasksScores);
    };
  
    fetchUsers(); // Appeler la fonction de récupération des utilisateurs
  }, [user]);
  

  // Filtrer les utilisateurs selon le terme de recherche
  const filteredUsers = users.filter((usr) => {
    const searchLower = searchQuery.toLowerCase();
    const departmentName = usr.departmentDetails?.[0]?.name?.toLowerCase() || '';
    const uniteName = usr.uniteDetails?.[0]?.name?.toLowerCase() || '';
    return (
      usr.name.toLowerCase().includes(searchLower) ||
      usr.role.toLowerCase().includes(searchLower) ||
      departmentName.includes(searchLower) ||
      uniteName.includes(searchLower)
    );
  });

  

// Trier les utilisateurs selon le score final décroissant
const sortedUsers = filteredUsers.map((usr) => {
  const finalScore = (socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0);
  console.log("Score final de l'utilisateur:", usr.name, finalScore); // Afficher le score final pour chaque utilisateur
  return {
    ...usr,
    socialScore: socialPoints[usr._id] || 0,
    taskScore: TaskPoints[usr._id] || 0,
    finalScore,
    isCurrentUser: usr._id === user.id, // Pour identifier l'utilisateur actuel
  };
});

// Utilisation du sort
sortedUsers.sort((a, b) => {
  if (isNaN(a.finalScore) || isNaN(b.finalScore)) {
    console.error("Erreur: finalScore contient des valeurs non numériques");
    return 0; // Aucun tri en cas d'erreur
  }
  return b.finalScore - a.finalScore;
});

 // Tri décroissant




  const imageUrl = (usrId, usr) =>
    usrId && usr && usr.profileImage
      ? `http://localhost:8000/user/${usrId}/profile`
      : "/assets/images/resources/user-pro-img.png";

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); 
    pdf.text("Leaderboard des professeurs", 10, 20);
    pdf.text(`Date du jour: ${moment().format('DD/MM/YYYY')}`, 10, 30); 
    
    pdf.setFont("Helvetica", "bold");
    pdf.text("Formule pour le Score des tâches:", 10, 40);
    pdf.setFont("Helvetica", "normal");
    pdf.text("Score des tâches = somme des points obtenus", 10, 45);
    
    const getRowBackgroundColor = (index) => {
      if (index < topQuartileIndex) {
        return "lightgreen"; // Top 25%
      } else if (index >= middleHalfIndex) {
        return "lightcoral"; // Derniers 25%
      } else {
        return "white"; // 50% du milieu
      }
    };

    pdf.autoTable({
      startY: 70,
      head: [['Rang', 'Nom', 'Rôle', 'Points sociaux', 'Score des tâches','Score final','Rating']],
      body: sortedUsers.map((usr, index) => [
        {
          content: index + 1,
          styles: { fillColor: getRowBackgroundColor(index) }, // Appliquer la couleur
        },
        usr.name,
        {
          content: `${usr.role} (${usr.departmentDetails?.[0]?.name || "N/A"} / ${usr.uniteDetails?.[0]?.name || "N/A"})`,
          styles: { fontStyle: 'bold' }, // Rendre le texte en gras
        },
        socialPoints[usr._id] || 0,
        `${TaskPoints[usr._id] || 0} (/ ${nbrTasksPoints[usr._id]})`, 
        (socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0),
        {
          content : usr.rating.length,
          styles: { fontStyle: 'bold' }
        },
      ]),
    });

    const pageHeight = pdf.internal.pageSize.getHeight();

        pdf.setTextColor(255, 0, 0); 
    pdf.text("Ces données sont strictement confidentielles !", 10, pageHeight - 10); 
    
   

    
    const logoWidth = 30;
    const logoHeight = 30;
    pdf.addImage(espritLogo, 'PNG', 180, 10, logoWidth, logoHeight); 
    
    const pdfFileName = `Leaderboard_${moment().format('DD-MM-YYYY')}.pdf`; 
    pdf.save(pdfFileName); 
  };
  

  const getStarImagePath  = (rank, totalUsers) => {
    console.log("rang",rank)
  const topQuartileIndex = Math.ceil(totalUsers * 0.25);
  const middleHalfIndex = Math.ceil(totalUsers * 0.75);

  if (rank < topQuartileIndex) {
    return fiveStars; // Pour le top 25%
  } else if (rank >= middleHalfIndex) {
    return oneStar; // Pour les derniers 25%
  } else {
    return threeStars; // Pour le 50% du milieu
  }
};


  const downloadUserPDF = async (usr, rank, totalUsers) => {
    const pdf = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4', 
    });

    const starImagePath = getStarImagePath(rank, totalUsers); // Obtenir le chemin de l'image
    console.log("image",starImagePath);
    //const response = await axios.get(starImagePath, { responseType: 'arraybuffer' });
    //const base64Star = Buffer.from(response.data, 'binary').toString('base64');
  
    pdf.addImage(starImagePath, 'JPEG', 250, 180, 35, 20); // Ajouter l'image en haut à gauche


    pdf.setFont("Helvetica", "bold");
    pdf.text(`Données de l'utilisateur: ${usr.name}`, 10, 20);
    pdf.setFont("Helvetica", "normal");
    pdf.text(`Rôle: ${usr.role} (${usr.departmentDetails?.[0]?.name || "N/A"} / ${usr.uniteDetails?.[0]?.name || "N/A"})`, 10, 30);
    pdf.text(`Points sociaux: ${socialPoints[usr._id] || 0}`, 10, 40);
    pdf.text(`Score des tâches: ${TaskPoints[usr._id] || 0}`, 10, 50);
  
    pdf.setFont("Helvetica", "bold");
    pdf.text(`Score final = Points sociaux + Score des tâches = ${(socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0)}`, 10, 60);

    if (isEnseignant) {
      const pieChartBase64 = await generatePieChartBase64(socialPoints[usr._id], TaskPoints[usr._id]);
      pdf.addImage(pieChartBase64, 'JPEG', 200, 40, 80, 80);
    }

  
    const profileImageUrl = `http://localhost:8000/user/${usr._id}/profile`; 
    try {
      const response = await axios.get(profileImageUrl, { responseType: 'arraybuffer' }); 
      const base64 = Buffer.from(response.data, 'binary').toString('base64'); 
      pdf.addImage(`data:image/jpeg;base64,${base64}`, 'JPEG', 180, 10, 30, 30);
    } catch (error) {
      console.error("Erreur lors du chargement de la photo de profil:", error);
      pdf.text("Aucune image de profil disponible", 180, 10); 
    }
  
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setTextColor(255, 0, 0); 
    pdf.text("Ces données sont strictement confidentielles !", 10, 10); 
  
    const logoWidth = 120;
    const logoHeight = 120;
    const logoX = pdf.internal.pageSize.getWidth() - logoWidth - 120; 
    const logoY = pageHeight - logoHeight - 10; 
    pdf.addImage(espritLogo, 'PNG', logoX, logoY, logoWidth, logoHeight); 
  
     // Ajouter la date d'aujourd'hui en bas à gauche
  const todayDate = moment().format('DD/MM/YYYY'); 
  pdf.setTextColor(0, 0, 0);
  pdf.text(`le: ${todayDate}`, 10, pageHeight - 20); 
  
    const pdfFileName = `Données_${usr.name}_${moment().format('DDMMYYYY')}.pdf`;
    pdf.save(pdfFileName); 
  };

    // Vérifier si le rang doit être affiché
    const shouldDisplayRank = isDirectorOfStudies || isChefDepartement || isChefUnite;
    const shouldDisplaySearchBar = isDirectorOfStudies || isChefDepartement || isChefUnite; // Condition pour afficher la barre de recherche
    const shouldDisplayCamembert =  isEnseignant || isDirectorOfStudies || isChefDepartement || isChefUnite; //condition pour afficher le camembert


     // Déterminer les indices pour les différentes parties
  const totalUsers = sortedUsers.length;
  const topQuartileIndex = Math.ceil(totalUsers * 0.25); // 25%
  const middleHalfIndex = Math.ceil(totalUsers * 0.75); // 75%



  // Fonction pour déterminer la couleur de fond selon le rang
const getRowBackgroundColor = (index, userId) => {
  if (userId === user.id) {
    return 'yellow'; // Jaune pour l'utilisateur actuel
  } else if (index < topQuartileIndex) {
    return 'lightgreen'; // 25% supérieur
  } else if (index >= middleHalfIndex) {
    return 'lightcoral'; // 25% inférieur
  } else {
    return 'transparent'; // 50% du milieu
  }
};
  return (
    <div>
      <h1 className="h2 mb-3 text-center">
        Leaderboard
        {!isDirectorOfStudies && ` ( Department: ${departmentName} /Unite : ${uniteName})`} 
      </h1>

      {shouldDisplaySearchBar && (
        <div className="row">
          <div className="col">
            <InputGroup>
              <InputGroup.Text>🔎</InputGroup.Text>
              <Form.Control
                placeholder="Rechercher par nom, rôle, département ou unité"
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </InputGroup>
          </div>
          <div className="col">
          <Button variant="primary" onClick={downloadPDF}>Télécharger en PDF</Button>
        </div>
        </div>
      )}

      <br />
      <br />
      <br />

      <Table striped bordered hover>
        <thead>
          <tr>
            {shouldDisplayRank && (
              <th className="text-center">Rang 🏆</th> 
            )}
            <th className="text-center">Nom 🙎‍♂️(❌ : vous)</th>
            <th className="text-center">Rôle 💼(Département/Unité)</th>
            <th className="text-center">Points sociaux 🗣️</th>
            <th className="text-center">Score des tâches 📋(/nbr de tâches📚)</th>
            <th className="text-center">Score final 🎯</th>
            <th className="text-center">Rating⭐</th>
            <th className="text-center">Télécharger 📥</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((usr, index) => (
            <tr key={usr._id}>
              {shouldDisplayRank && (
                <td className="text-center" style={{ backgroundColor: getRowBackgroundColor(index,usr._id) }}>{index + 1}</td> 
              )}
              <td className="text-center">
                <img
                  src={imageUrl(usr._id, usr)}
                  alt={usr.name}
                  style={{ width: '30px', height: '30px', borderRadius: '50%' }}
                />
                {usr.name} {usr.isCurrentUser && ' (❌)'}
              </td>
              <td className="text-center">
                {usr.role} <br />
                ({usr.departmentDetails?.[0]?.name || "N/A"} / {usr.uniteDetails?.[0]?.name || "N/A"})
              </td>
              <td className="text-center">{socialPoints[usr._id] || 0}</td>
              <td className="text-center">{TaskPoints[usr._id]} (/ {nbrTasksPoints[usr._id]})</td>
              <td className="text-center">{(socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0)}</td>
              <td className="text-center">{usr.rating}</td>
              <td className="text-center">
                <Button variant="secondary" onClick={() => downloadUserPDF(usr)}>Télécharger</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {shouldDisplayCamembert &&<div className="d-flex justify-content-center "> {/* Pour centrer le camembert */}
          <UserStats />
        </div>}
    </div>
  );
}

export default Leaderboard;
  