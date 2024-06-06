import React, { useState } from 'react';
import BackupButtonTechnicalSkills from '../utils/BackupButtonTechnicalSkills';
import technicalSkillService from '../../../../services/technicalSkill-service';
import { Spinner, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function AddTechnicalSkill() {
    const [errors, setErrors] = useState({});
    const [technicalSkill, setTechnicalSkill] = useState({
        name: '',
        domaine: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSaveTechnicalSkill = () => {
        const data = {
            name: technicalSkill.name,
            domaine: technicalSkill.domaine,
            description: technicalSkill.description,
        };
        setLoading(true);
        technicalSkillService.addTechnicalSkill(data);
        setLoading(false);
        navigate('/technicalSkills/');
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

        // Validation pour le champ "domaine"
        if (!inputValues.domaine) {
            errors.domaine = "Le domaine est requis";
        }

        // Validation pour le champ "description"
        if (inputValues.description && (inputValues.description.length < 50 || inputValues.description.length > 200)) {
            errors.description = "La description doit contenir entre 50 et 200 caractères";
        } else if (inputValues.description && !/^[\w\sÀ-ú.-]*$/.test(inputValues.description)) {
            errors.description = "La description ne doit contenir que des lettres, des chiffres, des espaces, des accents et des points";
        }

        return errors;
    };

    const onValueChange = (e) => {
        setTechnicalSkill({ ...technicalSkill, [e.target.name]: e.target.value });
        setErrors(validateValues({ ...technicalSkill, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (event) => {
        // Récupération du formulaire
        const form = event.currentTarget;

        // Mise à jour des erreurs
        setErrors(validateValues(technicalSkill));

        // Vérification de la validité du formulaire
        if (form.checkValidity() === false) {
            // Annulation de l'action par défaut si le formulaire n'est pas valide
            event.preventDefault();
            event.stopPropagation();
        }

        // Vérification s'il n'y a pas d'erreurs de validation
        if (Object.keys(errors).length === 0) {
            // Si aucune erreur de validation, appel de la méthode pour sauvegarder la compétence technique
            handleSaveTechnicalSkill();
        }
    };

    return (
        <div className='p-4 mt-5'>
            <BackupButtonTechnicalSkills />
            <h1 className='h3 my-4 text-center'>Créer une compétence technique</h1>
            {loading ? <Spinner animation="border" variant="primary" /> : ''}
            <div className='flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto'>
                <Form noValidate onSubmit={handleSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="6" controlId="validationCustom01">
                            <Form.Label>Nom de la compétence</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={technicalSkill.name}
                                onChange={onValueChange}
                                isInvalid={!!errors.name}
                                required
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.name}
                            </Form.Control.Feedback>
                        </Form.Group>
                        <Form.Group as={Col} md="6" controlId="validationCustom02">
                            <Form.Label>Domaine</Form.Label>
                            <Form.Select
                                name="domaine"
                                value={technicalSkill.domaine}
                                onChange={onValueChange}
                                isInvalid={!!errors.domaine}
                                required
                                className="w-100" // Ajout de la classe pour augmenter la largeur
                            >
                                <option value="">Sélectionnez un domaine</option>
                                <option value="Frontend">Frontend</option>
                                <option value="Backend">Backend</option>
                                <option value="Other">Other</option>
                            </Form.Select>
                            <Form.Control.Feedback type="invalid">
                                {errors.domaine}
                            </Form.Control.Feedback>
                        </Form.Group>

                    </Row>
                    <Row className="mb-3">
                        <Form.Group as={Col} md="12" controlId="validationCustomDescription">
                            <Form.Label>Description (optionnelle)</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={4}
                                name="description"
                                value={technicalSkill.description}
                                onChange={onValueChange}
                                isInvalid={!!errors.description}
                            />
                            <Form.Control.Feedback type="invalid">
                                {errors.description}
                            </Form.Control.Feedback>
                        </Form.Group>
                    </Row>
                    <Button variant="primary" type="submit" disabled={Object.keys(errors).length !== 0}>
                        Créer
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default AddTechnicalSkill;
