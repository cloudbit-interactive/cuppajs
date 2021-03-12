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

    static escapeHTML(string){
        return string.replace(new RegExp("<", 'g'), "&lt;");
    }
}