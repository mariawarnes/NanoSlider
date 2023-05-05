function getCurrentInstructionIndex() {
    var activeInstruction = document.querySelector('.carousel div.active');
    return activeInstruction ? Array.from(activeInstruction.parentNode.children).indexOf(activeInstruction) : 0;
}

function setInstructionWidth() {
    const carousel = document.querySelector('.carousel');
    const instructions = document.querySelectorAll('.carousel div');
    const width = parseInt(getComputedStyle(document.querySelector('.carousel-wrap')).width);
    const instructionMargin = parseInt(getComputedStyle(instructions[getCurrentInstructionIndex()]).marginLeft) + parseInt(getComputedStyle(instructions[getCurrentInstructionIndex()]).marginRight);
    instructions.forEach(instruction => instruction.style.width = (width - instructionMargin) + "px");
    carousel.style.transform = `translateX(${-1 * (width * getCurrentInstructionIndex() + instructionMargin * getCurrentInstructionIndex())}px)`;
}

function showInstruction(index) {
    const instructions = document.querySelectorAll('.carousel div');
    const carousel = document.querySelector('.carousel');
    instructions.forEach(instruction => instruction.classList.remove('active'));
    instructions[index].classList.add('active');
    currentInstructionIndex = index;
    const instructionMargin = parseInt(getComputedStyle(instructions[getCurrentInstructionIndex()]).marginLeft) + parseInt(getComputedStyle(instructions[getCurrentInstructionIndex()]).marginRight);
    const instructionWidth = parseInt(getComputedStyle(instructions[getCurrentInstructionIndex()]).width);
    carousel.style.transform = `translateX(${-1 * (instructionWidth * index + instructionMargin * index)}px)`;
}

function initSlider() {
    const instructions = document.querySelectorAll('.carousel div');
    const carousel = document.querySelector('.carousel');
    const prevButton = document.querySelector('.prev-button');
    const nextButton = document.querySelector('.next-button');
    let startX, currentX;

    prevButton.addEventListener('click', showPreviousInstruction);
    nextButton.addEventListener('click', showNextInstruction);
    document.addEventListener('keydown', handleKeyDown);
    carousel.addEventListener('mousedown', handleDragStart);
    carousel.addEventListener('mousemove', handleDragOngoing);
    carousel.addEventListener('mouseup', handleDragEnd);
    carousel.addEventListener('touchstart', handleDragStart);
    carousel.addEventListener('touchmove', handleDragOngoing);
    carousel.addEventListener('touchend', handleDragEnd);
    carousel.addEventListener('touchcancel', handleDragEnd);

    function showPreviousInstruction() {
        showInstruction((getCurrentInstructionIndex() - 1 + instructions.length) % instructions.length);
    }

    function showNextInstruction() {
        showInstruction((getCurrentInstructionIndex() + 1) % instructions.length);
    }

    function handleKeyDown(event) {
        if (event.key === 'ArrowRight') {
            showNextInstruction();
        } else if (event.key === 'ArrowLeft') {
            showPreviousInstruction();
        }
    }

    function handleDragStart(event) {
        event.preventDefault();
        startX = (event.type === 'touchstart') ? event.touches[0].clientX : event.clientX;
    }

    function handleDragOngoing(event) {
        event.preventDefault();
        if (!startX) return;
        currentX = (event.type === 'touchmove') ? event.touches[0].clientX : event.clientX;
        const distanceX = currentX - startX;
        carousel.style.transform = `translateX(${(event.clientX * (1 / instructions.length) * -1)}px)`;
    }

    function handleDragEnd(event) {
        event.preventDefault();
        if (!startX) return;
        currentX = event.clientX;
        if (currentX > startX) {
            showPreviousInstruction();
        } else if (currentX < startX) {
            showNextInstruction();
        }
        startX = currentX = null;
    }

    instructions.forEach(instruction => {
        instruction.addEventListener('mousedown', handleDragStart);
        instruction.addEventListener('mousemove', handleDragOngoing);
        instruction.addEventListener('mouseup', handleDragEnd);
        instruction.addEventListener('touchstart', handleDragStart);
        instruction.addEventListener('touchmove', handleDragOngoing);
        instruction.addEventListener('touchend', handleDragEnd);
        instruction.addEventListener('touchcancel', handleDragEnd);
    });

    showInstruction(0);
    setInstructionWidth();

    document.querySelector('.carousel-wrap').style.visibility = "visible";
}

document.addEventListener('DOMContentLoaded', function() {
    initSlider();
});

window.addEventListener('resize', setInstructionWidth);