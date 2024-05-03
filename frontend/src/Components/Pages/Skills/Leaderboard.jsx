import { useEffect, useState,  useContext } from 'react';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import { getUsersForTask } from '../../../services/task-service';
import socialSkillService from '../../../services/socialSkill-service';
import { getChecklistScoreForUser } from '../../../services/checklist-service';
import { UserContext } from '../../../../context/userContext';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment';
import espritLogo from '../../../../public/assets/images/esprit.png';
import UserStats, { generatePieChartBase64 } from './UserStats';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';
import * as XLSX from 'xlsx'; // Importez SheetJS
import userScoreServicePost from '../../../services/userScoreServicePost';
import publicationService from '../../../services/page-service';




function Leaderboard() {
  const { user } = useContext(UserContext);
  console.log('user:', user);
  const [users, setUsers] = useState([]);
  const [socialPoints, setSocialPoints] = useState({});
  const [TaskPoints, setTaskPoints] = useState({});
  const [nbrTasksPoints, setNbrTasksPoints] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [, setCurrentUserRating] = useState('');
  const [currentPage, setCurrentPage] = useState(0);
  const [pageScores, setPageScores] = useState({}); // Pour les scores des pages
  const [publicationScores, setPublicationScores] = useState({}); 
  
  const itemsPerPage = 10; // Nombre d'éléments par page (ajustez si nécessaire)
  //console.log("user Actu",user);
  


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
      console.log("Filtre",filteredUsers);

      console.log("userActuel :",user);
  
      const roleUserActuel = user.role;
      const departmentUserActuel = user.departement;
      const uniteUserActuel = user.unite;
  
      // Conditions de filtrage selon le rôle de l'utilisateur actuel
      if (roleUserActuel === "Directeur d'étude") {
        // Le directeur d'étude voit tout le monde
      } else if (roleUserActuel === 'Chef département') {
        filteredUsers = filteredUsers.filter((usr) => (
          ((usr.role === 'Enseignant' || usr.role === 'Chef unité') &&
          usr.departmentDetails?.[0]?.name === departmentUserActuel)||
           usr._id === user.id
        ));
      } else if (roleUserActuel === 'Chef unité') {
        filteredUsers = filteredUsers.filter((usr) => (
          (usr.role === 'Enseignant' &&
          usr.departmentDetails?.[0]?.name === departmentUserActuel &&
          usr.uniteDetails?.[0]?.name === uniteUserActuel)||
          usr._id === user.id
        ));
      } else if (roleUserActuel === 'Enseignant') {
        filteredUsers = filteredUsers.filter((usr) => usr._id === user.id);
        
      }
  
      
      
  
      // Obtenir les scores sociaux, les scores des tâches et les scores finaux
      const socialScores = {};
      const taskScores = {};
      const nbrTasksScores = {};


    //score des posts
    const publicationScores = {};
  
    const pageScores = {}; // Pour stocker les scores des pages


      await Promise.all(
        filteredUsers.map(async (usr) => {
          //console.log("ONESTLA",usr)

          //score Sociaux
          const socialResult = await socialSkillService.getSocialSkillsByUser(usr._id);
          const socialScore = socialResult.socialSkills.reduce(
            (sum, skill) => sum + (skill.pointSocial || 0),
            0
          );
          socialScores[usr._id] = socialScore * 10;

          // Récupérer les scores des tâches
  
          const checklistResult = await getChecklistScoreForUser(usr._id);
          const taskScore = checklistResult.data.message.somme || 1;
          const nbrTasks = checklistResult.data.message.numberOfTasks || 0;
  
          taskScores[usr._id] = taskScore;
          nbrTasksScores[usr._id] = nbrTasks;



                  // Ajouter les appels API pour les publications
        const [reports, likes, dislikes] = await Promise.all([
          userScoreServicePost.getPubReportsById(usr._id),
          userScoreServicePost.getPubLikesById(usr._id),
          userScoreServicePost.getPubDislikesById(usr._id),

        ]);

        // ppu
        const pagePublications = await publicationService.getPublicationsByGroupAndUser( usr._id);

            // Calculer le score des publications
            const postScore = calculatePostScore(
            likes,
             dislikes,
              reports
          );

          publicationScores[usr._id] = postScore; // Stocker le score de publication
          //console.log("Ceci est le score de la publication du user"+usr._id+":",postScore);
          const pageScore = pagePublications.length ||0;
          //console.log("ija",pageScore);
          pageScores[usr._id] = pageScore;

        })
      );
  
      // Calcul du score final pour chaque utilisateur
      const finalUsers = filteredUsers.map((usr) => {
        const finalScore = (socialScores[usr._id] || 0) + (TaskPoints[usr._id] || 0)+ (publicationScores[usr._id] || 0)+(pageScores[usr._id] || 0);
        return {
          ...usr,
          finalScore,


        };
      });







  
      // Trouver Xmax et Xmin
      const Xmax = Math.max(...finalUsers.map((usr) => usr.finalScore));
      //console.log("xmax", Xmax);
      const Xmin = Math.min(...finalUsers.map((usr) => usr.finalScore));
      //console.log("xmin", Xmin);
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
       // Obtenir le rating de l'utilisateur actuel
       const currentUser = ratedUsers.find((usr) => usr._id === user._id);
       setCurrentUserRating(currentUser ? currentUser.rating : '');

      setUsers(ratedUsers);
      setSocialPoints(socialScores);
      setTaskPoints(taskScores);
      setNbrTasksPoints(nbrTasksScores);
      setPublicationScores(publicationScores);
      setPageScores(pageScores);
      
    };
  
    fetchUsers(); // Appeler la fonction de récupération des utilisateurs
  }, [user]);

  // Fonction pour calculer le score des publications
const calculatePostScore = (nbrLikes, nbrDislikes, nbrReports) => {
  const x = nbrLikes - nbrDislikes;
  const z = nbrReports;

  if (x <= 0) {
    return 0;
  } else if (z === 0) {
    return x;
  } else if (z > 0 && z <= 3) {
    return (2 * x - 3 * z) / 3;
  } else {
    return (2 * x - 3 * z) / z;
  }
}
  

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
  const finalScore = (socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0) + (publicationScores[usr._id]||0) + (pageScores[usr._id]||0);
  //console.log("Score final de l'utilisateur:", usr.name, finalScore); // Afficher le score final pour chaque utilisateur
  return {
    ...usr,
    socialScore: socialPoints[usr._id] || 0,
    taskScore: TaskPoints[usr._id] || 0,
    publicationScore: publicationScores[usr._id]||0,
    pageScore: pageScores[usr._id]||0, // Inclure le score de page
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



 
 const imageUrl = (usrId, usr) => {
  if (usrId && usr?.profileImage) {
    return `http://localhost:8000/user/${usrId}/profile`;
  } else {
    return "/assets/images/resources/user-pro-img.png";
  }
};



const downloadPDF = () => {
  const pdf = new jsPDF('p', 'mm', 'a4');

  // Titre du document
  pdf.text("Leaderboard des professeurs", 10, 20);
  pdf.text(`Date du jour: ${moment().format('DD/MM/YYYY')}`, 10, 30);

  // Ajouter le logo
  const logoWidth = 50;
  const logoHeight = 50;
  pdf.addImage(espritLogo, 'PNG', 150, 10, logoWidth, logoHeight);

  // Ajouter les formules des scores
  pdf.setFont("Helvetica", "bold");
  pdf.text("Formules pour le calcul des scores :", 10, 40);
  
  pdf.setFont("Helvetica", "normal");
  pdf.text("Score des tâches = Somme des points obtenus", 10, 45);

  // Formule des publications (posts)
  pdf.text("Score des publications dépend du nbr de LIkes, Dislikes et Report", 10, 50); // Exemple de formule
  pdf.text("Score des publications inclut les rapports (si applicables)", 10, 55);

  // Formule du score de page
  pdf.text("Score de Page = Nombre de publications dans toutes les pages du site", 10, 60);

  // Ajouter le tableau des scores
  pdf.autoTable({
    startY: 70,
    head: [
      ['Rang', 'Nom', 'Rôle', 'Points sociaux', 'Score des tâches', 'Score des publications', 'Score de Page', 'Score final', 'Rating'],
    ],
    body: sortedUsers.map((usr, index) => [
      {
        content: index + 1,
        styles: { fontStyle: 'bold' },
      },
      usr.name,
      `${usr.role} (${usr.departmentDetails?.[0]?.name || 'N/A'} / ${usr.uniteDetails?.[0]?.name || 'N/A'})`,
      socialPoints[usr._id] || 0,
      `${TaskPoints[usr._id]} (/ ${nbrTasksPoints[usr._id]})`,
      publicationScores[usr._id]|| 0,
      pageScores[usr._id] || 0,
      usr.finalScore || 0,
      {
        content : usr.rating.length,
        styles: { fontStyle: 'bold' }
      },
    ]),
  });

  // Ajouter une note de confidentialité
  const pageHeight = pdf.internal.pageSize.getHeight();
  pdf.setTextColor(255, 0, 0);
  pdf.text("Ces données sont strictement confidentielles !", 10, pageHeight - 10);

  const pdfFileName = `Leaderboard_${moment().format('DD-MM-YYYY')}.pdf`;
  pdf.save(pdfFileName); // Télécharger le fichier PDF
};
  




  const downloadUserPDF = async (usr, rank, totalUsers) => {
    const pdf = new jsPDF({
      orientation: 'l',
      unit: 'mm',
      format: 'a4', 
    });

    console.log("OKLM",usr);

    
    
    


    pdf.setFont("Helvetica", "bold");
    pdf.text(`Données de l'utilisateur: ${usr.name}`, 10, 20);
    pdf.setFont("Helvetica", "normal");
    pdf.text(`Rôle: ${usr.role} (${usr.departmentDetails?.[0]?.name || "N/A"} / ${usr.uniteDetails?.[0]?.name || "N/A"})`, 10, 30);
    pdf.text(`Points sociaux: ${socialPoints[usr._id] || 0}`, 10, 40);
    pdf.text(`Score des tâches: ${TaskPoints[usr._id] || 0}`, 10, 50);
    pdf.text(`Score des publications: ${publicationScores[usr._id] || 0}`, 10, 60);
    pdf.text(`Score de page: ${pageScores[usr._id] || 0}`, 10, 70);
  
    pdf.setFont("Helvetica", "bold");
    pdf.text(`Score final = Points sociaux + Score des tâches + Score des publications + Score de page= ${(socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0) + (publicationScores[usr._id] || 0) + (pageScores[usr._id] || 0)}`, 10, 80);

    
      const pieChartBase64 = await generatePieChartBase64(socialPoints[usr._id], TaskPoints[usr._id]);
      console.log("PIE",pieChartBase64);

      pdf.addImage(pieChartBase64, 'JPEG', 180, 105, 100, 100);
    

  
    const profileImageUrl = imageUrl(usr._id, usr);  
    console.log("AAAAAA",profileImageUrl);
    try {
      const response = await axios.get(profileImageUrl, { responseType: 'arraybuffer' }); 
      console.log("RES",response);
      const base64 = btoa(
        String.fromCharCode(...new Uint8Array(response.data))
      ); // Conversion en base64 sans Buffer
      console.log("Base  64:",base64)
      pdf.addImage(`data:image/jpeg;base64,${base64}`, 'JPEG', 220, 5, 50, 50);
    } catch (error) {
      console.error("Erreur lors du chargement de la photo de profil:", error);
      pdf.text("Aucune image de profil disponible", 180, 10); 
    }
  
    const pageHeight = pdf.internal.pageSize.getHeight();
    pdf.setTextColor(255, 0, 0); 
    pdf.text("Ces données sont strictement confidentielles !", 10, 10); 
  
    
    pdf.addImage(espritLogo, 'PNG', 40, 100, 80, 80); 
  
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
    const shouldDisplayPagination = isDirectorOfStudies || isChefDepartement || isChefUnite;


     // Déterminer les indices pour les différentes parties
  const totalUsers = sortedUsers.length;
  console.log(sortedUsers);
  const totalPages = Math.ceil(totalUsers / itemsPerPage);
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
const handlePageChange = (data) => {
  const selectedPage = data.selected;

  setCurrentPage(selectedPage);
};

const startIndex = currentPage * itemsPerPage;
const endIndex = startIndex + itemsPerPage;
const usersToDisplay = sortedUsers.slice(startIndex, endIndex);

const applyBordersAndCenter = (worksheet) => {
  const range = XLSX.utils.decode_range(worksheet['!ref']); // Obtenir la plage des cellules
  for (let row = range.s.r; row <= range.e.r; row++) { // Parcourir les lignes
    for (let col = range.s.c; col <= range.e.c; col++) { // Parcourir les colonnes
      const cellRef = XLSX.utils.encode_cell({ r: row, c: col }); // Référence de la cellule
      const cell = worksheet[cellRef] || {}; // Obtenir la cellule
      cell.s = cell.s || {}; // Initialiser le style s'il n'existe pas encore
      cell.s.border = { // Appliquer les bordures
        top: { style: 'thin' },
        bottom: { style: 'thin' },
        left: { style: 'thin' },
        right: { style: 'thin' },
      };
      cell.s.alignment = { horizontal: 'center' }; // Centrer le texte horizontalement
      worksheet[cellRef] = cell; // Mettre à jour la cellule avec les bordures
    }
  }

  // Mettre en gras les titres des colonnes (première ligne)
  const headers = ['A1', 'B1', 'C1', 'D1', 'E1', 'F1', 'G1','H1','I1'];
  headers.forEach((header) => {
    if (worksheet[header]) {
      worksheet[header].s = worksheet[header].s || {}; // S'assurer que le style existe
      worksheet[header].s.font = { bold: true }; // Mettre le titre en gras
    }
  });
};

const downloadExcel = () => {
  const data = sortedUsers.map((usr, index) => ({
    Rang: startIndex + index + 1,
    Nom: usr.name,
    Rôle: `${usr.role} (${usr.departmentDetails?.[0]?.name || "N/A"} / ${usr.uniteDetails?.[0]?.name || "N/A"})`,
    "Points sociaux": socialPoints[usr._id] || 0,
    "Score des tâches": `${TaskPoints[usr._id]} (/ ${nbrTasksPoints[usr._id]})`,
    "Score des publications": publicationScores[usr._id] || 0, // Ajout du score des publications
    "Score de page": pageScores[usr._id] || 0, // Ajout du score de page
    "Score final": (socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0)  + (publicationScores[usr._id] || 0) + (pageScores[usr._id] || 0),
    Rating: usr.rating,
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);

  // Calculer la somme des points sociaux, des scores des tâches, et des scores finaux
  const totalSocialPoints = data.reduce((total, item) => total + item["Points sociaux"], 0);
  const totalTaskScores = data.reduce((total, item) => total + parseInt(item["Score des tâches"].split(" ")[0]), 0); // Extraire le score numérique
  const totalPublicationScores = data.reduce((total, item) => total + (item["Score des publications"] || 0), 0); // Calculer la somme des scores des publications
const totalPageScores = data.reduce((total, item) => total + (item["Score de page"] || 0), 0); // Calculer la somme des scores de page
  const totalFinalScores = data.reduce((total, item) => total + item["Score final"], 0);

  // Ajouter des lignes pour les sommes
  XLSX.utils.sheet_add_aoa(worksheet, [
    ["", "", "", "", "", "","" ],
    ["", "", "", "", "", "","" ],
    ["", "", "", "", "", "","" ],
    [ "", "","Total des Points sociaux:", totalSocialPoints], 
    [ "", "","Total des Scores des tâches:", totalTaskScores], 
    [ "", "","Total des Scores des publications générales:", totalPublicationScores], 
    [ "", "","Total des Scores des publications des pages:", totalPageScores], 
    [ "", "","Total des Scores finaux:", totalFinalScores]
  ], {
    origin: -1, // Ajouter à la fin de la feuille
  });



  // Appliquer les bordures et centrer les cellules
  applyBordersAndCenter(worksheet);

  // Ajustement de la largeur des colonnes
  worksheet["!cols"] = [{ wch: 10 }, { wch: 25 }, { wch: 40 }, { wch: 15 }, { wch: 15 }, { wch: 20 }, { wch: 15 }, { wch: 10 }, { wch: 15 }]; 

  const workbook = XLSX.utils.book_new(); // Nouveau classeur
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Leaderboard'); // Ajouter la feuille

  // Obtenir la date du jour au format 'YYYY-MM-DD'
  const today = moment().format('YYYY-MM-DD');

  // Nom du fichier avec la date
  const fileName = `Leaderboard_${today}.xlsx`;

  XLSX.writeFile(workbook, fileName); // Exporter le fichier Excel avec le nom contenant la date
};

  return (
    <div>
      <h1 className="h2 mb-3 text-center">
        
        Leaderboard {isEnseignant && <span>Personnel</span>}
<br />
        {!isDirectorOfStudies && <span className='h4'> (Department : {departmentName} /Unite : {uniteName})</span>} 
        
      </h1>

      {shouldDisplaySearchBar && (
        
        <div className="row"><hr />
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
          <Button variant="danger" onClick={downloadPDF}> PDF 💾</Button>
          <Button variant="secondary" onClick={downloadExcel} style={{ marginLeft: '5px', backgroundColor: '#39a241' }}>
  Excel 📊
</Button>

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
            <th className="text-center">Score des tâches 📋<br />(/nbr de tâches📚)</th>
            <th className="text-center">Score des publications ✍️</th>
            <th className='text-center'>Score de Page 📄</th> 
            <th className="text-center">Score final 🎯</th>
            {!isEnseignant && <th className="text-center">Rating⭐</th>}
            <th className="text-center">Télécharger 📥</th>
          </tr>
        </thead>
        <tbody>
          {usersToDisplay.map((usr, index) => (
            <tr key={usr._id}>
              {shouldDisplayRank && (
                <td className="text-center h3" style={{ backgroundColor: getRowBackgroundColor(startIndex + index,usr._id) }}>{startIndex+index + 1}</td> 
              )}

              <td className="text-center h5">
                
              {usr._id === user.id ? (
                <>
                {usr.name} <span className='h6'>(❌)</span> 

              <Link to="/profil" title="Voir votre profil">
              <img
                src={imageUrl(usr._id, usr)}
                alt={usr.name}
                style={{ width: '40px', height: '40px', borderRadius: '50%' }}
              />
              <br />
              (voir profil) 
            </Link>
                
                </>
                
            
          ) : (

            <>
            {usr.name}
            <Link to={`/profileuser/${usr._id}`} title="Voir le profil">
              <img
                src={imageUrl(usr._id, usr)}
                alt={usr.name}
                style={{ width: '30px', height: '30px', borderRadius: '50%' }}
              />
              <br />
              (voir profile) {/* Lien pour les autres utilisateurs */}
            </Link>
            
            </>
            
          )}
              </td>
              <td className="text-center h5">
                {usr.role} <br />
                ({usr.departmentDetails?.[0]?.name || "N/A"} / {usr.uniteDetails?.[0]?.name || "N/A"})
              </td>
              <td className="text-center h5">{socialPoints[usr._id] || 0}</td>
              <td className="text-center h5">{TaskPoints[usr._id]} (/ {nbrTasksPoints[usr._id]})</td>
              <td className="text-center h5">{usr.publicationScore  || 0}</td>
              <td className='text-center'>{usr.pageScore || 0}</td> 
              <td className="text-center h4">{(socialPoints[usr._id] || 0) + (TaskPoints[usr._id] || 0)+(usr.publicationScore  || 0) + (usr.pageScore || 0)}</td>
              {!isEnseignant &&<td className="text-center h6">{usr.rating}</td>}
              <td className="text-center ">
                <Button variant="danger" onClick={() => downloadUserPDF(usr)}> <span className='h5'>PDF 💾</span></Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      {/* Pagination */}
{/* Pagination */}

{shouldDisplayPagination && <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
      <ReactPaginate
        pageCount={totalPages}
        pageRangeDisplayed={5}
        marginPagesDisplayed={2}
        onPageChange={handlePageChange}
        containerClassName={"pagination"}
        activeClassName={"active"}
      />
    </div>  }
    <hr />
    {shouldDisplayCamembert &&<div className="d-flex justify-content-center "> {/* Pour centrer le camembert */}
                        <UserStats />
                  </div>}    
    </div>
  );
}

export default Leaderboard;
  