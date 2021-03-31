export class Utils{
    static textAreaAutoHeight(target){
        function onResize(){
            target.forEach(element => {
                element.style.height = 0;
                element.style.height = `${element.scrollHeight}px`;
            });
        };
        onResize();
        document.defaultView.removeEventListener("resize", onResize);
        document.defaultView.addEventListener("resize", onResize);
    }

    static prismCode(type, string){
        if(type == "language-html") type = "language-markup";
        if(type == "language-markup") string = Utils.escapeHTML(string);
       string = `<code class="${type}">${String(string).trim()}</code>`;
       return string;
        
    }
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