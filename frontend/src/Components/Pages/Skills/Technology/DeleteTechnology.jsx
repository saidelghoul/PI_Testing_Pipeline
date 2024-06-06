import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import technologyService from '../../../../services/technology-service';
import BackupButtonTechnologies from '../utils/BackupButtonTechnologies ';

function DeleteTechnology() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const [technologyName, setTechnologyName] = useState('');

  useEffect(() => {
    const fetchTechnologyName = async () => {
      try {
        const response = await technologyService.getTechnologyById(id);
        setTechnologyName(response.name);
      } catch (error) {
        console.error('Erreur lors de la récupération du nom de la technologie :', error);
      }
    };

    fetchTechnologyName();
  }, [id]);

  const handleDeleteTechnology = async () => {
    try {
      setLoading(true);
      await technologyService.deleteTechnology(id);
      setLoading(false);
      navigate('/technologies/');
    } catch (error) {
      console.error('Erreur lors de la suppression de la technologie :', error);
      setLoading(false);
    }
  };

  const handleCancelDelete = () => {
    navigate('/technologies/');
  };

  return (
    <>
      <div className='p-4 mt-5'>
        <BackupButtonTechnologies />
        <h1 className='text-3x1 my-4'>Supprimer la technologie "{technologyName}"</h1>
        <p>Êtes-vous sûr de vouloir supprimer cette technologie ? Cette action est irréversible.</p>
        <div className="mt-3">
          <Button variant="danger" onClick={handleDeleteTechnology} disabled={loading}>
            {loading ? <Spinner animation="border" size="sm" /> : 'Confirmer la suppression'}
          </Button>
          <Button variant="secondary" className="ms-2" onClick={handleCancelDelete} disabled={loading}>
            Annuler
          </Button>
        </div>
      </div>
    </>
  );
}

export default DeleteTechnology;
