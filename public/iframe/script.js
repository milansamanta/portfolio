
var active = null;
const container = document.querySelector('.container');

const buttons = {
    about_me: document.querySelector('button.about_me'),
    credits: document.querySelector('button.credits'),
    resume: document.querySelector('button.resume'),
    contact: document.querySelector('button.contact'),
    projects: document.querySelector('button.projects'),
}

for (const name in buttons){
    buttons[name].addEventListener('click', (e) =>{
        e.stopPropagation();
        if(active !== null && active !== buttons[name]){
            active.classList.remove('active');
            active = null;
        }
        buttons[name].classList.add('active');
        active = buttons[name];
    });
    var z = 0;
    buttons[name].addEventListener('dblclick', ()=>{

        const section = document.querySelector('.'+name+"_section");
        const taskbutton = document.querySelector("#"+name);
        section.style.zIndex = ++z;
        section.style.display = 'flex';
        taskbutton.style.backgroundColor = 'rgb(66, 66, 66)';
        taskbutton.style.borderBottom = '.3rem solid #00c3ff';
    });
}

document.querySelectorAll('.clickable').forEach(key=>{
    key.addEventListener('click', e=>{
        e.stopPropagation();
        const section = document.querySelector('.'+key.getAttribute('id')+"_section");
        section.style.zIndex = ++z;
        section.style.display = 'flex';
        key.style.backgroundColor = 'rgba(55, 55, 55, 0.51)';
        key.style.borderBottom = '.3rem solid #00c3ff';
    });
})

container.addEventListener('click', removeActive);

function removeActive(){
    if(active !== null){
        active.classList.remove('active');
        active = null;
    }
}

document.querySelectorAll('.popup').forEach(key=>{
    key.addEventListener('click', e=>{
        e.stopPropagation();
    });
});

document.querySelectorAll('.close').forEach(key=>{
    key.addEventListener('click', e=>{
        e.stopPropagation();
        const parent = key.closest('.popup');
        parent.style.display = 'none';
        const taskbutton = document.querySelector('#'+parent.getAttribute('name'));
        taskbutton.style.borderBottom='none';
        taskbutton.style.backgroundColor = 'transparent'
    });
});

document.querySelectorAll('.fullscreen').forEach(key=>{
    key.addEventListener('click', (e)=>{
        e.stopPropagation();
        if(document.querySelector('#'+key.parentElement.getAttribute('for')).checked){
            const section = key.closest('.popup');
            section.style.width = '60%';
            section.style.height = '90%';
            key.textContent = 'square';
        }
        else{
            const section = key.closest('.popup');
            section.style.width = '100%';
            section.style.height = '100%';
            key.textContent = 'select_window_2';
        }
    })
});


document.querySelectorAll('.minimize').forEach(key=>{
    key.addEventListener('click', (e)=>{
        e.stopPropagation();
        const parent = key.closest('.popup');
        parent.closest('.popup').style.display = 'none';
        document.querySelector('#'+parent.getAttribute('name')).style.backgroundColor = 'transparent';
    })
});