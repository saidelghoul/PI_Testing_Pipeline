import React, { useState, useEffect } from 'react';
import { Spinner, Button } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import socialSkillService from '../../../../services/socialSkill-service';
import BackupButtonSocialSkills from '../utils/BackupButtonSocialSkills';

function DeleteSocialSkill() {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const [socialSkillName, setSocialSkillName] = useState('');

    useEffect(() => {
        const fetchSocialSkillName = async () => {
            try {
                const response = await socialSkillService.getSocialSkillById(id);
                setSocialSkillName(response.name);
            } catch (error) {
                console.error('Erreur lors de la récupération du nom de la compétence sociale :', error);
            }
        };

        fetchSocialSkillName();
    }, [id]);

    const handleDeleteSocialSkill = async () => {
        try {
            setLoading(true);
            await socialSkillService.removeSocialSkill(id);
            setLoading(false);
            navigate('/socialSkills/');
        } catch (error) {
            console.error('Erreur lors de la suppression de la compétence sociale :', error);
            setLoading(false);
        }
    };

    const handleCancelDelete = () => {
        navigate('/socialSkills/');
    };

    return (
        <>
            <div className='p-4 mt-5'>
                <BackupButtonSocialSkills />
                <h1 className='text-3x1 my-4'>Supprimer la compétence sociale "{socialSkillName}"</h1>
                <p>Êtes-vous sûr de vouloir supprimer cette compétence sociale ? Cette action est irréversible.</p>
                <div className="mt-3">
                    <Button variant="danger" onClick={handleDeleteSocialSkill} disabled={loading}>
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

export default DeleteSocialSkill;
