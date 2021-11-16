export class Utils{
    
    static escapeHTML(string){
        return string.replace(new RegExp("<", 'g'), "&lt;");
    }

    static openMenu(value = true){
        if(value) document.body.classList.add("open-menu");
        else document.body.classList.remove("open-menu");
    }

    static toggleMenu(){
        document.body.classList.toggle("open-menu");
    }
}