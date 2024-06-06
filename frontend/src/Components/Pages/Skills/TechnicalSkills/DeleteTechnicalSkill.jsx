import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import technicalSkillService from '../../../../services/technicalSkill-service';
import BackupButtonTechnicalSkills from '../utils/BackupButtonTechnicalSkills';

function DeleteTechnicalSkill() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [technicalSkillName, setTechnicalSkillName] = useState('');

    useEffect(() => {
        const fetchTechnicalSkillName = async () => {
            try {
                const response = await technicalSkillService.getTechnicalSkillById(id);
                setTechnicalSkillName(response.name);
            } catch (error) {
                console.error('Erreur lors de la récupération du nom de la compétence technique :', error);
            }
        };

        fetchTechnicalSkillName();
    }, [id]);

    const handleDeleteTechnicalSkill = async () => {
        try {
            setLoading(true);
            await technicalSkillService.removeTechnicalSkill(id);
            setLoading(false);
            navigate('/technicalSkills/');
        } catch (error) {
            console.error('Erreur lors de la suppression de la compétence technique :', error);
            setLoading(false);
        }
    };

    const handleCancelDelete = () => {
        navigate('/technicalSkills/');
    };

    return (
        <>
            <div className='p-4 mt-5'>
                <BackupButtonTechnicalSkills />
                <h1 className='text-3x1 my-4'>Supprimer la compétence technique "{technicalSkillName}"</h1>
                <p>Êtes-vous sûr de vouloir supprimer cette compétence technique ? Cette action est irréversible.</p>
                <div className="mt-3">
                    <Button variant="danger" onClick={handleDeleteTechnicalSkill} disabled={loading}>
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

export default DeleteTechnicalSkill;
