import { gridColumnsTotalWidthSelector } from '@material-ui/data-grid';
import React, { useEffect, useState } from 'react';

import emailjs from 'emailjs-com';


const PaginationSendQuiz = ({ results, mail, prenom }) => {

  async function sendEmail(e) {
    await handleSubmit()
    e.preventDefault();
    emailjs.sendForm('gmail', 'template_dyh0t7j', e.target, 'user_m8QyJVfzo4XccAITEIlbI')
      .then((result) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }


  const [j, seti] = useState([])

  function handleSubmit() {
    for (var i = 0; i < results.length; i++) {

      seti([...j, "http://localhost:3001/QuizManager/" + results[i] + "/" + mail + "          "])
    }
  }



  console.log(j)
  console.log(resu)

  return (
    <div className="others ">
        <form onSubmit={sendEmail}>
            <section className="contact-section pt-130">
                <div className="container">
                    <div className="row g-4 align-items-center">
                       

                        <div className="col-auto gf-field-string gf-field-fonction  " >
                            <label>
                                <input class="form-control" type="hidden" name="message" value={j}

                                />
                            </label>
                        </div>

                        
                            <button className="btn btn-primary gf-submit-btn pixi-submit pixi-submit x" type="submit">Envoyer</button>

                        
                        


                        <div className="col-auto gf-field-string gf-field-fonction  " >
                            <label>
                                <input class="form-control" type="hidden" name="email" value={mail}
                                />

                                <input class="form-control" type="hidden" name="to_name" value={prenom}
                                />

                                <input class="form-control" type="hidden" name="from_name" value="PIXIMIND"
                                />

                                <input class="form-control" type="hidden" name="subject" value="Quiz"
                                />
                            </label>
                        </div>
                    </div>

                   
                           


                </div>

            </section>
        </form>
    </div>
);
};

export default PaginationSendQuiz;