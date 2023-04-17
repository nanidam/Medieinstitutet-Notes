declare const tinymce: any;

export const tinymceToolbar = () => {
  tinymce.remove();

  tinymce.init({
    selector: "#textarea",
    height: "300px",
    plugins: ["wordcount"],
    toolbar:
      "undo redo | formatpainter casechange blocks | bold italic underline | backcolor forecolor |" +
      "alignleft aligncenter alignright alignjustify | " +
      "removeformat",
    menubar: false,
  });
};
