import { useEffect, useState } from 'react';
import BackupButtonTechnologies from '../utils/BackupButtonTechnologies ';
import technologyService from '../../../../services/technology-service';
import { Spinner, Form, Button, Row, Col } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

function EditTechnology() {
    const [errors, setErrors] = useState({});
    const [technology, setTechnology] = useState({
        name: '',
        description: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleSaveTechnology = async () => {
        const data = {
            name: technology.name,
            description: technology.description,
        };
        setLoading(true);
        await technologyService.updateTechnology(id, data);
        setLoading(false);
        navigate('/technologies/');
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

        return errors;
    };

    const onValueChange = (e) => {
        setTechnology({ ...technology, [e.target.name]: e.target.value });
        setErrors(validateValues({ ...technology, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (event) => {
        // Récupération du formulaire
        const form = event.currentTarget;

        // Mise à jour des erreurs
        setErrors(validateValues(technology));

        // Vérification de la validité du formulaire
        if (form.checkValidity() === false) {
            // Annulation de l'action par défaut si le formulaire n'est pas valide
            event.preventDefault();
            event.stopPropagation();
        }

        // Vérification s'il n'y a pas d'erreurs de validation
        if (Object.keys(errors).length === 0) {
            // Si aucune erreur de validation, appel de la méthode pour sauvegarder la technologie
            handleSaveTechnology();
        }
    };

    useEffect(() => {
        setLoading(true);
        const getTechnology = async () => {
            const data = await technologyService.getTechnologyById(id);
            setTechnology(data);
        }

        getTechnology();
    }, []);

    return (
        <>
            <div className='p-4 mt-5'>
                <BackupButtonTechnologies />
                <h1 className='h3 my-4 text-center'>Mise à Jour d'une technologie</h1>
                <div className='flex flex-col border-2 border-sky-400 rounded-xl p-4 mx-auto'>
                    <Form noValidate onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Form.Group as={Col} md="12" controlId="validationCustom01">
                                <Form.Label>Nom de la technologie</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="name"
                                    value={technology.name}
                                    onChange={onValueChange}
                                    isInvalid={!!errors.name}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.name}
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
                                    value={technology.description}
                                    onChange={onValueChange}
                                    isInvalid={!!errors.description}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {errors.description}
                                </Form.Control.Feedback>
                            </Form.Group>
                        </Row>
                        <Button variant="primary" type="submit" disabled={Object.keys(errors).length !== 0}>
                            Modifier
                        </Button>
                    </Form>
                </div>
            </div>
        </>
    )
}

export default EditTechnology;
