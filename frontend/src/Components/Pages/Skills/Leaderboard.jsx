import { useEffect, useState, useRef } from 'react';
import { getUsersForTask } from '../../../services/task-service';
import socialSkillService from '../../../services/socialSkill-service';
import { Table, Button, Form, InputGroup } from 'react-bootstrap';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import moment from 'moment'; // Pour la date
import espritLogo from '../../../../public/assets/images/esprit.png';

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [socialPoints, setSocialPoints] = useState({});
  const leaderboardRef = useRef(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const listUsers = await getUsersForTask();
      setUsers(listUsers.data.message);

      const socialScores = {};
      await Promise.all(
        listUsers.data.message.map(async (user) => {
          const result = await socialSkillService.getSocialSkillsByUser(user._id);
          let score = 0;
          if (result.message.length === 0) {
            score = 1; // Valeur par défaut si aucun point social
          } else {
            result.message.forEach((skills) => (score += skills.pointSocial));
          }
          socialScores[user._id] = score;
        })
      );
      setSocialPoints(socialScores);
    };
    fetchUsers();
  }, []);

  const downloadPDF = () => {
    const pdf = new jsPDF('p', 'mm', 'a4'); // Format A4
    pdf.text("Leaderboard des professeurs", 10, 20); // Titre
    pdf.text(`Date du jour: ${moment().format('DD/MM/YYYY')}`, 10, 30); // Date

    const tableData = users.map((user, index) => [
      index + 1, // Rang
      user.name,
      user.role,
      socialPoints[user._id] || 0, // Points sociaux
      "Autre information",
    ]);

    pdf.autoTable({
      startY: 40, // Position du tableau
      head: [['Rang ', 'Nom ', 'Rôle ', 'Points sociaux ', 'Autre information']],
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

  const filteredUsers = users.filter((user, index) => {
    const rank = (index + 1).toString();
    const lowerCaseQuery = searchQuery.toLowerCase();

    const matchesRank = rank === searchQuery;
    const matchesName = user.name?.toLowerCase().includes(lowerCaseQuery);
    const matchesRole = user.role?.toLowerCase().includes(lowerCaseQuery);

    return matchesName || matchesRole || matchesRank;
  });

  return (
    <div>
      <h1 className="h2 mb-3 text-center">Leaderboard</h1>

      <div className="row">
        <div className="col">
          <InputGroup className="col-md-12 d-flex flex-row justifiez-content-end">
            <InputGroup.Text>🔎</InputGroup.Text
            ><Form.Control
              placeholder="Rechercher..."
              aria-label="Rechercher..."
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
              <th>Rang 🏆</th>
              <th>Nom 🙎‍♂️</th>
              <th>Rôle 💼</th>
              <th>Points sociaux 📋</th>
              <th>Autre information</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.name}</td>
                <td>{user.role}</td>
                <td>{socialPoints[user._id] || 0}</td>
                <td>Autre information</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Leaderboard;
