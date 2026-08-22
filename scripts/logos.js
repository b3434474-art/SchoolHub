(() => {
  // Logo enhancement for the first 50 SchoolHub listings.
  // If a logo cannot load, the existing emoji is kept as the fallback.
  const domains = {
    'Khan Academy':'khanacademy.org','IXL':'ixl.com','Google Classroom':'classroom.google.com','Canvas':'instructure.com','Schoology':'schoology.com','Seesaw':'seesaw.me','Moodle':'moodle.org','Microsoft Teams for Education':'microsoft.com','Edmodo':'edmodo.com','Nearpod':'nearpod.com','Pear Deck':'peardeck.com','Quizizz':'quizizz.com','Kahoot!':'kahoot.com','Quizlet':'quizlet.com','BrainPOP':'brainpop.com','BrainPOP Jr.':'jr.brainpop.com','Discovery Education':'discoveryeducation.com','PBS LearningMedia':'pbslearningmedia.org','PBS Kids':'pbskids.org','Scholastic Learn at Home':'scholastic.com','Epic!':'getepic.com','Reading Eggs':'readingeggs.com','Raz-Kids':'raz-kids.com','Reading A-Z':'readinga-z.com','Starfall':'starfall.com','ABCMouse':'abcmouse.com','Prodigy':'prodigygame.com','DreamBox':'dreambox.com','Freckle':'freckle.com','Zearn':'zearn.org','ST Math':'stmath.com','Math Playground':'mathplayground.com','MathGames':'mathgames.com','SplashLearn':'splashlearn.com','DeltaMath':'deltamath.com','ALEKS':'aleks.com','MATHia':'carnegielearning.com','Carnegie Learning':'carnegielearning.com','Amplify':'amplify.com','NWEA Learning':'nwea.org','Achieve3000':'achieve3000.com','Lexia':'lexialearning.com','i-Ready':'curriculumassociates.com','Study Island':'studyisland.com','Edmentum':'edmentum.com','Exact Path':'edmentum.com','Imagine Learning':'imaginelearning.com','ReadTheory':'readtheory.org','CommonLit':'commonlit.org'
  };
  const emoji = {'Khan Academy':'🎓','IXL':'➗','Google Classroom':'🏫','Canvas':'🎨','Schoology':'🏫','Seesaw':'📝','Moodle':'📚','Microsoft Teams for Education':'💬','Edmodo':'🚫','Nearpod':'📊','Pear Deck':'📊','Quizizz':'🧠','Kahoot!':'🎮','Quizlet':'🗂️','BrainPOP':'🧠','BrainPOP Jr.':'🧒','Discovery Education':'🔎','PBS LearningMedia':'📺','PBS Kids':'🦁','Scholastic Learn at Home':'📚','Epic!':'📖','Reading Eggs':'🥚','Raz-Kids':'📖','Reading A-Z':'📚','Starfall':'⭐','ABCMouse':'🐭','Prodigy':'🧙','DreamBox':'🧮','Freckle':'🐸','Zearn':'➕','ST Math':'🧠','Math Playground':'🔢','MathGames':'🎯','SplashLearn':'💦','DeltaMath':'📐','ALEKS':'📐','MATHia':'🧮','Carnegie Learning':'📘','Amplify':'📚','NWEA Learning':'📊','Achieve3000':'📖','Lexia':'📖','i-Ready':'🎯','Study Island':'🏝️','Edmentum':'🎓','Exact Path':'🛤️','Imagine Learning':'💭','ReadTheory':'📖','CommonLit':'📚'};
  const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const addLogos = () => {
    document.querySelectorAll('.app-card').forEach(card => {
      if (card.dataset.logoEnhanced) return;
      const title = card.querySelector('h3')?.textContent.trim();
      const domain = domains[title];
      if (!domain) return;
      const existing = card.querySelector('.app-logo, .website-logo, img');
      if (existing) return;
      const top = card.querySelector('.app-card-top') || card;
      const wrap = document.createElement('div');
      wrap.className = 'schoolhub-logo';
      wrap.innerHTML = `<img src="https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128" alt="${escapeHtml(title)} logo"><span>${emoji[title] || '📚'}</span>`;
      const img = wrap.querySelector('img');
      img.addEventListener('error', () => { img.hidden = true; wrap.querySelector('span').hidden = false; });
      wrap.querySelector('span').hidden = true;
      top.prepend(wrap);
      card.dataset.logoEnhanced = 'true';
    });
  };
  const style = document.createElement('style');
  style.textContent = `.schoolhub-logo{width:64px;height:64px;border-radius:16px;display:grid;place-items:center;overflow:hidden;background:var(--card,#fff);border:1px solid var(--border,#ddd);flex:0 0 64px}.schoolhub-logo img{width:48px;height:48px;object-fit:contain}.schoolhub-logo span{font-size:38px}.app-card-top{display:flex;align-items:flex-start;gap:12px}`;
  document.head.appendChild(style);
  const observer = new MutationObserver(addLogos);
  observer.observe(document.getElementById('appGrid') || document.body, {childList:true,subtree:true});
  document.addEventListener('DOMContentLoaded', addLogos);
  addLogos();
})();
