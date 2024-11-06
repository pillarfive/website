document.addEventListener("DOMContentLoaded", ()=>{
    const goToSelectedPageBtn = document.getElementById("go-to-selected-page-btn");
    const howToOptions = Array.from(document.getElementById("how-to-options").querySelectorAll("option"));
    goToSelectedPageBtn.addEventListener("click", ()=>{
        const selectedOption = howToOptions.find((option)=>option.selected);
        const url = selectedOption.value;
        document.location.href = url;
    });
});

//# sourceMappingURL=test-card.1747ef47.js.map
