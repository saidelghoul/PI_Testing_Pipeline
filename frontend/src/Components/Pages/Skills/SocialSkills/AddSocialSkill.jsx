import React, { useState } from 'react';
import BackupButtonSocialSkills from '../utils/BackupButtonSocialSkills';
import socialSkillService from '../../../../services/socialSkill-service';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddSocialSkill() {
    const [errors, setErrors] = useState({});
    const [socialSkill, setSocialSkill] = useState({
        name: '',
        pointSocial: 0,
        niveau: 'bas',
        dateAttribution: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveSocialSkill = () => {
        const data = {
            name: socialSkill.name,
            pointSocial: socialSkill.pointSocial,
            niveau: socialSkill.niveau,
            dateAttribution: socialSkill.dateAttribution,
            description: socialSkill.description,
        };
        setLoading(true);
        socialSkillService.addSocialSkill(data);
        setLoading(false);
        navigate('/socialSkills/');
    }

    const validateValues = (inputValues) => {
        let errors = {};

        // Validation pour le champ "name"
        if (!inputValues.name) {
            errors.name = "Le nom est requis";
        } else if (inputValues.name.length < 3 || inputValues.name.length > 30) {
            errors.name = "Le nom doit contenir entre 3 et 30 caractères";
        } else if (!/^[\w\sÀ-ú.-]*$/.test(inputValues.name)) {
            errors.name = "Le nom ne doit contenir que des lettres, des chiffres, des espaces, des accents et des points";
        }

        // Validation pour le champ "description"
        if (inputValues.description && (inputValues.description.length < 50 || inputValues.description.length > 200)) {
            errors.description = "La description doit contenir entre 50 et 200 caractères";
        } else if (inputValues.description && !/^[\w\sÀ-ú.-]*$/.test(inputValues.description)) {
            errors.description = "La description ne doit contenir que des lettres, des chiffres, des espaces, des accents et des points";
        }

        // Validation pour le champ "pointSocial"
        if (!inputValues.pointSocial) {
            errors.pointSocial = "Le nombre de points est requis";
        } else if (!/^\d+$/.test(inputValues.pointSocial)) {
            errors.pointSocial = "Le nombre de points doit être un nombre entier";
        } else if (parseInt(inputValues.pointSocial) > 50) {
            errors.pointSocial = "Le nombre de points doit être inférieur ou égal à 50";
        }

        // Validation pour le champ "niveau"
        if (!inputValues.niveau) {
            errors.niveau = "Le niveau est requis";
        }
        return errors;
    };

    const onValueChange = (e) => {
        setSocialSkill({ ...socialSkill, [e.target.name]: e.target.value });
        setErrors(validateValues({ ...socialSkill, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (event) => {
        // Récupération du formulaire
        const form = event.currentTarget;

        // Mise à jour des erreurs
        setErrors(validateValues(socialSkill));

        // Vérification de la validité du formulaire
        if (form.checkValidity() === false) {
            // Annulation de l'action par défaut si le formulaire n'est pas valide
            event.preventDefault();
            event.stopPropagation();
        }

        // Vérification s'il n'y a pas d'erreurs de validation
        if (Object.keys(errors).length === 0) {
            // Si aucune erreur de validation, appel de la méthode pour sauvegarder la compétence sociale
            handleSaveSocialSkill();
        }
    };

    return (
        <div className='p-4 mt-5'>
            <BackupButtonSocialSkills />
            <h1 className='text-3x1 my-4'>Créer une compétence sociale</h1>
            {loading ? <Spinner /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
                <div className='my-4'>
                    <form className="row g-3 needs-validation" noValidate onSubmit={handleSubmit}>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom01" className="form-label my-1">Nom de la compétence</label>
                            <input type="text" className={`form-control ${errors.name && 'is-invalid'}`} id="validationCustom01" required name='name' value={socialSkill.name} onChange={onValueChange} />
                            {errors.name && (
                                <div className="invalid-feedback">{errors.name}</div>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustom02" className="form-label my-1">Points</label>
                            <input type="text" className={`form-control ${errors.pointSocial && 'is-invalid'}`} id="validationCustom02" required name='pointSocial' value={socialSkill.pointSocial} onChange={onValueChange} />
                            {errors.pointSocial && (
                                <div className="invalid-feedback">{errors.pointSocial}</div>
                            )}
                        </div>
                        <div className="col-md-4">
                            <label htmlFor="validationCustomDate" className="form-label my-1">Date de création</label>
                            <div className="input-group has-validation">
                                <input type="date" className="form-control" id="validationCustomDate" aria-describedby="inputGroupPrepend" required name='dateCreation' readOnly value={new Date().toISOString().split('T')[0]} />
                            </div>
                        </div>
                        <div className="col-md-4 my-5">
                            <label htmlFor="validationCustom03" className="form-label my-2">Niveau</label>
                            <div>
                                <select className={`form-select ${errors.niveau && 'is-invalid'}`} id="validationDefault04" required name='niveau' value={socialSkill.niveau} onChange={onValueChange}>
                                    <option disabled value="">Sélectionnez une option</option>
                                    <option value="bas">Bas</option>
                                    <option value="intermédiaire">Intermédiaire</option>
                                    <option value="élevé">Élevé</option>
                                </select>
                                {errors.niveau && (
                                    <div className="invalid-feedback">{errors.niveau}</div>
                                )}
                            </div>
                        </div>
                        <div className="col-md-12 my-1">
                            <label htmlFor="validationCustomDescription" className="form-label my-2">Description (optionnelle)</label>
                            <textarea className={`form-control ${errors.description && 'is-invalid'}`} name='description' id="validationCustomDescription" required rows="4" value={socialSkill.description} onChange={onValueChange}></textarea>
                            {errors.description && (
                                <div className="invalid-feedback">{errors.description}</div>
                            )}
                        </div>
                        <div className="col-12">
                            <button className="btn btn-primary" disabled={Object.keys(errors).length !== 0} onClick={handleSaveSocialSkill}>Créer</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AddSocialSkill;
