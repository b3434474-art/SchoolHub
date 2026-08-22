(() => {
  // SchoolHub logo enhancement for all 150 learning resources.
  // Logos are cached by the GitHub Actions logo-check workflow and safely fall back
  // to the live favicon service if a cached logo is unavailable.
  const domains = {
    'Khan Academy':'khanacademy.org','IXL':'ixl.com','Google Classroom':'classroom.google.com','Canvas':'instructure.com','Schoology':'schoology.com','Seesaw':'seesaw.me','Moodle':'moodle.org','Microsoft Teams for Education':'microsoft.com','Edmodo':'edmodo.com','Nearpod':'nearpod.com','Pear Deck':'peardeck.com','Quizizz':'quizizz.com','Kahoot!':'kahoot.com','Quizlet':'quizlet.com','BrainPOP':'brainpop.com','BrainPOP Jr.':'jr.brainpop.com','Discovery Education':'discoveryeducation.com','PBS LearningMedia':'pbslearningmedia.org','PBS Kids':'pbskids.org','Scholastic Learn at Home':'scholastic.com','Epic!':'getepic.com','Reading Eggs':'readingeggs.com','Raz-Kids':'raz-kids.com','Reading A-Z':'readinga-z.com','Starfall':'starfall.com','ABCMouse':'abcmouse.com','Prodigy':'prodigygame.com','DreamBox':'dreambox.com','Freckle':'freckle.com','Zearn':'zearn.org','ST Math':'stmath.com','Math Playground':'mathplayground.com','MathGames':'mathgames.com','SplashLearn':'splashlearn.com','DeltaMath':'deltamath.com','ALEKS':'aleks.com','MATHia':'carnegielearning.com','Carnegie Learning':'carnegielearning.com','Amplify':'amplify.com','NWEA Learning':'nwea.org','Achieve3000':'achieve3000.com','Lexia':'lexialearning.com','i-Ready':'curriculumassociates.com','Study Island':'studyisland.com','Edmentum':'edmentum.com','Exact Path':'edmentum.com','Imagine Learning':'imaginelearning.com','ReadTheory':'readtheory.org','CommonLit':'commonlit.org',
    'NoRedInk':'noredink.com','Quill':'quill.org','ReadWorks':'readworks.org','TweenTribune':'tweentribune.com','Actively Learn':'activelylearn.com','Writable':'writable.com','Turnitin':'turnitin.com','Kami':'kamiapp.com','Formative':'formative.com','Classkick':'classkick.com','Pear Assessment':'peardeck.com','Socrative':'socrative.com','Mentimeter':'mentimeter.com','Gimkit':'gimkit.com','Blooket':'blooket.com','Educaplay':'educaplay.com','Wordwall':'wordwall.net','LearningApps':'learningapps.org','Flocabulary':'flocabulary.com','Brainly':'brainly.com','Schoolhouse.world':'schoolhouse.world','CK-12':'ck12.org','OpenStax':'openstax.org','LibreTexts':'libretexts.org','PhET Interactive Simulations':'phet.colorado.edu','ExploreLearning Gizmos':'explorelearning.com','Labster':'labster.com','Mystery Science':'mysteryscience.com','Generation Genius':'generationgenius.com','Science Buddies':'sciencebuddies.org','NASA STEM':'nasa.gov','NASA Climate Kids':'climatekids.nasa.gov','National Geographic Kids':'kids.nationalgeographic.com','Smithsonian Learning Lab':'learninglab.si.edu','Smithsonian Science Education Center':'ssec.si.edu','Exploratorium':'exploratorium.edu','HHMI BioInteractive':'biointeractive.org','BioRender':'biorender.com','Crash Course':'thecrashcourse.com','TED-Ed':'ed.ted.com','YouTube Learning':'youtube.com','Britannica School':'school.eb.com','World Book Online':'worldbookonline.com','Encyclopedia.com':'encyclopedia.com','Ducksters':'ducksters.com','History.com':'history.com','iCivics':'icivics.org','C-SPAN Classroom':'c-span.org','DocsTeach':'docsteach.org','Library of Congress Learning':'loc.gov','Smithsonian History Explorer':'historyexplorer.si.edu','Facing History & Ourselves':'facinghistory.org','Digital Public Library of America':'dp.la','Project Gutenberg':'gutenberg.org','Internet Archive':'archive.org','Poetry Foundation':'poetryfoundation.org','Read.gov':'read.gov','Storyline Online':'storylineonline.net','Lit2Go':'etc.usf.edu','Common Sense Education':'commonsense.org','Code.org':'code.org','Scratch':'scratch.mit.edu','ScratchJr':'scratchjr.org','Tynker':'tynker.com','CodeHS':'codehs.com','Codecademy':'codecademy.com','freeCodeCamp':'freecodecamp.org','Khan Academy Computing':'khanacademy.org','GitHub Education':'education.github.com','W3Schools':'w3schools.com','HTML Dog':'htmldog.com','Replit':'replit.com','TypingClub':'typingclub.com','Typing.com':'typing.com','Nitro Type':'nitrotype.com','Duolingo':'duolingo.com','Duolingo for Schools':'schools.duolingo.com','Rosetta Stone':'rosettastone.com','Memrise':'memrise.com','Conjuguemos':'conjuguemos.com','SpanishDict':'spanishdict.com','BBC Languages':'bbc.co.uk','Art for Kids Hub':'artforkidshub.com','Canva for Education':'canva.com','Google Arts & Culture':'artsandculture.google.com','MetKids':'metmuseum.org','Chrome Music Lab':'musiclab.chromeexperiments.com','MusicTheory.net':'musictheory.net','Noteflight':'noteflight.com','Flat for Education':'flat.io','Soundtrap for Education':'soundtrap.com','Tinkercad':'tinkercad.com','CoSpaces Edu':'cospaces.io','Minecraft Education':'education.minecraft.net','LEGO Education':'education.lego.com','CS First':'csfirst.withgoogle.com','TypingClub for Schools':'typingclub.com','Khan Academy Kids':'learn.khanacademy.org','Mathigon':'mathigon.org','GeoGebra':'geogebra.org','Desmos':'desmos.com'
  };

  const emoji = {
    'Khan Academy':'🎓','IXL':'➗','Google Classroom':'🏫','Canvas':'🎨','Schoology':'🏫','Seesaw':'📝','Moodle':'📚','Microsoft Teams for Education':'💬','Edmodo':'🚫','Nearpod':'📊','Pear Deck':'📊','Quizizz':'🧠','Kahoot!':'🎮','Quizlet':'🗂️','BrainPOP':'🧠','BrainPOP Jr.':'🧒','Discovery Education':'🔎','PBS LearningMedia':'📺','PBS Kids':'🦁','Scholastic Learn at Home':'📚','Epic!':'📖','Reading Eggs':'🥚','Raz-Kids':'📖','Reading A-Z':'📚','Starfall':'⭐','ABCMouse':'🐭','Prodigy':'🧙','DreamBox':'🧮','Freckle':'🐸','Zearn':'➕','ST Math':'🧠','Math Playground':'🔢','MathGames':'🎯','SplashLearn':'💦','DeltaMath':'📐','ALEKS':'📐','MATHia':'🧮','Carnegie Learning':'📘','Amplify':'📚','NWEA Learning':'📊','Achieve3000':'📖','Lexia':'📖','i-Ready':'🎯','Study Island':'🏝️','Edmentum':'🎓','Exact Path':'🛤️','Imagine Learning':'💭','ReadTheory':'📖','CommonLit':'📚','NoRedInk':'✍️','Quill':'✍️','ReadWorks':'📖','TweenTribune':'📰','Actively Learn':'📚','Writable':'✍️','Turnitin':'🔍','Kami':'📝','Formative':'📋','Classkick':'✏️','Pear Assessment':'📊','Socrative':'📊','Mentimeter':'💬','Gimkit':'🎮','Blooket':'🎮','Educaplay':'🎯','Wordwall':'🧩','LearningApps':'🧩','Flocabulary':'🎤','Brainly':'🧠','Schoolhouse.world':'🏫','CK-12':'📘','OpenStax':'📚','LibreTexts':'📚','PhET Interactive Simulations':'🧪','ExploreLearning Gizmos':'🧪','Labster':'🧪','Mystery Science':'🔬','Generation Genius':'🧬','Science Buddies':'🔬','NASA STEM':'🚀','NASA Climate Kids':'🌎','National Geographic Kids':'🦁','Smithsonian Learning Lab':'🏛️','Smithsonian Science Education Center':'🔬','Exploratorium':'🔬','HHMI BioInteractive':'🧬','BioRender':'🧬','Crash Course':'🎬','TED-Ed':'💡','YouTube Learning':'▶️','Britannica School':'📚','World Book Online':'📖','Encyclopedia.com':'📚','Ducksters':'🦆','History.com':'🏛️','iCivics':'🏛️','C-SPAN Classroom':'🏛️','DocsTeach':'📜','Library of Congress Learning':'🏛️','Smithsonian History Explorer':'🏛️','Facing History & Ourselves':'🌎','Digital Public Library of America':'📚','Project Gutenberg':'📖','Internet Archive':'🗄️','Poetry Foundation':'📝','Read.gov':'📖','Storyline Online':'📚','Lit2Go':'📖','Common Sense Education':'💡','Code.org':'💻','Scratch':'🐱','ScratchJr':'🐱','Tynker':'💻','CodeHS':'💻','Codecademy':'💻','freeCodeCamp':'💻','Khan Academy Computing':'💻','GitHub Education':'🐙','W3Schools':'🌐','HTML Dog':'🐶','Replit':'💻','TypingClub':'⌨️','Typing.com':'⌨️','Nitro Type':'🏎️','Duolingo':'🦉','Duolingo for Schools':'🦉','Rosetta Stone':'🗣️','Memrise':'🧠','Conjuguemos':'🗣️','SpanishDict':'🇪🇸','BBC Languages':'🌐','Art for Kids Hub':'🎨','Canva for Education':'🎨','Google Arts & Culture':'🎨','MetKids':'🏛️','Chrome Music Lab':'🎵','MusicTheory.net':'🎵','Noteflight':'🎼','Flat for Education':'🎼','Soundtrap for Education':'🎵','Tinkercad':'🧩','CoSpaces Edu':'🕶️','Minecraft Education':'⛏️','LEGO Education':'🧱','CS First':'💻','TypingClub for Schools':'⌨️','Khan Academy Kids':'🧒','Mathigon':'📐','GeoGebra':'📐','Desmos':'📊'
  };

  const escapeHtml = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const safeFileName = s => String(s).replace(/[^A-Za-z0-9._-]+/g, '-').replace(/[-.]+$/g, '').replace(/^[-.]+/g, '') || 'logo';

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
      const localLogo = `/assets/logos/${safeFileName(title)}.png`;
      const remoteLogo = `https://www.google.com/s2/favicons?domain=${encodeURIComponent(domain)}&sz=128`;
      wrap.innerHTML = `<img src="${localLogo}" alt="${escapeHtml(title)} logo"><span>${emoji[title] || '📚'}</span>`;
      const img = wrap.querySelector('img');
      const fallback = wrap.querySelector('span');
      img.addEventListener('error', () => {
        if (img.dataset.remoteTried !== 'true') {
          img.dataset.remoteTried = 'true';
          img.src = remoteLogo;
          return;
        }
        img.hidden = true;
        fallback.hidden = false;
      });
      fallback.hidden = true;
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
