document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("li").forEach((li) => {
        li.addEventListener("click", () => {
            li.classList.toggle("completed");
        });
    });
});
