import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import odd4 from '../../../../../public/assets/images/ODD/4_EducationQuality.jpg';
import odd5 from '../../../../../public/assets/images/ODD/5_EgaliteSexes.jpg';
import odd8 from '../../../../../public/assets/images/ODD/8_EmploiesDecent.jpg';
import odd10 from '../../../../../public/assets/images/ODD/10_ReductionInegalites.jpg';
import odd15 from '../../../../../public/assets/images/ODD/15_Faune_Flore_Terrestre.jpg';
import odds from '../../../../../public/assets/images/ODD/ODDs.png';

function ODDSocialSkillPopup() {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
         <img src={odds} alt="ODD 4" style={{ width: '40px', height: '40px' }}  onClick={handleShow}></img>


      <Modal show={show} onHide={handleClose}>
        <p className='text-center'>😊😎🤖👩👨🏿</p>
        <Modal.Body>
          <div>
            <br /> <br />
            <h1 className="text-center">✔️ Accès à une éducation de qualité </h1> <br />
            <div className='row'>
            <img src={odd4} alt="ODD 4" style={{ width: '70px', height: '70px' }} />
            <p className='col-10'>👨🏻‍🎓 : "Grâce à cette application, nous favorisons un accès équitable à travers une éducation de qualité pour tous. Venez apprendre les bonnes pratiques en travaillant dans des activités/projets en groupe !"</p>
            </div>
            
          </div>

<p>------------------------------------------------------------------------------------------------------------------</p>
          <div>
            <h1 className="text-center"> ✔️ Egalité entre les sexes </h1> <br />
            <div className='row'> <img src={odd5} alt="ODD 5" style={{ width: '70px', height: '70px' }} />
            <div className='col-10'>
            <p>👩:"pas de Discrimination ni de Sexisme, dans notre Application, tous vos investissements, vos efforts et votre travail sont promus Grâce à l'intelligence du Système!"<br /> 🧑:"Génial, Sympa et honnête !!" </p></div>
            
            <p className='col-12'>   </p>

            </div>
            
            <p>------------------------------------------------------------------------------------------------------------------</p>     
          </div>
          
          <div >
            <h4 className="text-center"> ✔️ Accès à des emplois décents </h4> <br />
            <div className='row'>
            <img src={odd8} alt="ODD 8" style={{ width: '70px', height: '70px' }} />
            <p className='col-10'>🧑🏻‍💻:"Grâce à notre applciation, nous vous Assurerons un emploi décent et une croissance économique durable qui sera recompensé par votre dur labeur ! Personne n'a le droit de vous elever ce droit !"</p>
            </div>
            <p>------------------------------------------------------------------------------------------------------------------</p>

          </div>

          <div>
            <h4 className="text-center"> ✔️ Réduction des inégalités</h4><br />
            <div className='row'>
            <img src={odd10} alt="ODD 10" style={{ width: '70px', height: '70px' }} />
            <p className='col-10'>🧑🏿🤝🏼🧑🏼:"Dans notre application, vous pouvez oubliez le racisme ainsi que toute autre forme d'inégalité au sein du pays et entre nous !"</p>
            </div>

          </div>
          <p>------------------------------------------------------------------------------------------------------------------</p>

          <div>
            <h4 className="text-center">✔️ Protection de la faune et la flore terrestre </h4> <br />
            <div className='row'>
            <img src={odd15} alt="ODD 15" style={{ width: '70px', height: '70px' }} />
            <p className='col-10'>🌱🌍🌱: "La déforestation et le gaspillage de papier c'est terminé !!!"</p>

            </div>
            <p>------------------------------------------------------------------------------------------------------------------</p>

          </div>
          <br /><br />
          <div className="text-center"><button onClick >🦾JOIN US 📲💬</button></div>
        </Modal.Body>
        <Modal.Footer>
          <button  onClick={handleClose}>fermer</button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default ODDSocialSkillPopup;
