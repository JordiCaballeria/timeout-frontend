import React from "react";
import { Editor } from "@tinymce/tinymce-react";

export function EditorText(props) {
  const { formik } = props;
  var useDarkMode = window.matchMedia("(prefers-color-scheme: dark)").matches;

  return (
    <Editor
      apiKey="puqq9cd1046iqi052nn87pidsxghc8p9hckatop5bttx7ofn"
      tagName="contingut"
      value={formik.values.contingut}
      onEditorChange={(newValue, editor) =>
        formik.setFieldValue("contingut", newValue)
      }
      init={{
        selector: "textarea#open-source-plugins",
        plugins:
          "print preview paste importcss searchreplace autolink autosave save directionality code visualblocks visualchars fullscreen image link media template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount imagetools textpattern noneditable help charmap quickbars emoticons",
        imagetools_cors_hosts: ["picsum.photos"],
        menubar: "file edit view insert format tools table help",
        toolbar:
          "undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons | fullscreen preview print | insertfile image media template link",
        toolbar_sticky: true,
        image_advtab: true,
        height: "100%",
        image_caption: true,
        quickbars_selection_toolbar:
          "bold italic | alignleft aligncenter alignright alignjustify | quicklink ",
        noneditable_noneditable_class: "mceNonEditable",
        /* toolbar_mode: 'sliding', */
        contextmenu: "link image imagetools table",
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
      }}
    />
  );
}
