let showform = (formid)=>{
    document.querySelectorAll(".formbox").forEach(form=>form.classList.remove("active"))
    document.getElementById(formid).classList.add("active")
}