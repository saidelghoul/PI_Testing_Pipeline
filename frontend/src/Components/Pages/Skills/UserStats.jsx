import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { useContext, useEffect, useState, useRef } from 'react';
import { UserContext } from '../../../../context/userContext';
import socialSkillService from '../../../services/socialSkill-service';
import { getChecklistScoreForUser } from '../../../services/checklist-service';
import html2canvas from 'html2canvas';

Chart.register(ArcElement, Tooltip, Legend);

function UserStats() {
  const { user } = useContext(UserContext);
  const [socialScore, setSocialScore] = useState(0);
  const [taskScore, setTaskScore] = useState(0);
  const chartRef = useRef(null); // Référence pour le camembert

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const socialResult = await socialSkillService.getSocialSkillsByUser(user.id);
        let socialSum = 0;
        const socialSkills = Array.isArray(socialResult.socialSkills) ? socialResult.socialSkills : [];
        socialSkills.forEach((skill) => {
          socialSum += skill.pointSocial || 1;
        });
        setSocialScore(socialSum*100);

        const checklistResult = await getChecklistScoreForUser(user.id);
        const taskSum = checklistResult.data.message.somme || 1;
        setTaskScore(taskSum);

      } catch (error) {
        console.error("Erreur lors de la récupération des scores:", error.message);
      }
    };

    fetchScores();
  }, [user]);

  const data = {
    labels: ['Points sociaux', 'Score des tâches'],
    datasets: [
      {
        data: [socialScore, taskScore],
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  const chartSize = {
    width: '450px',
    height: '450px',
  };

  return (
    <div style={{ textAlign: "center" }}  >
      <p>--------------------------------------</p>
      <h3>
        Vos statistiques vous permettent de connaître vos points forts et faibles.
      </h3>
      
      <p>
        <b>Cela vous permettra de connaître vos points forts et faibles.</b>
      </p>
      <br />
      <br />
      <br />
      <div
        
        id="pie-chart" // Identifiant unique
        style={{
          ...chartSize,
          border: "2px solid black", // Encadrement noir
          display: "flex",
          justifyContent: "center", // Centre le graphique horizontalement
          alignItems: "center", // Centre le graphique verticalement
        }}
        ref={chartRef} // Référence pour l'encapsulation
      >
        <Pie data={data} />
      </div>
    </div>
  );
}

// Fonction pour générer le camembert en base64 avec html2canvas
export const generatePieChartBase64 = async () => {
  const chartElement = document.getElementById("pie-chart");
  const canvas = await html2canvas(chartElement); // Capturer le camembert
  return canvas.toDataURL("image/png"); // Retourner en base64
};

export default UserStats;
