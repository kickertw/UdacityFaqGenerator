import React from 'react';
import { Editor } from '@tinymce/tinymce-react';

function TinyMceTest() {
  const handleEditorChange = (content, editor) => {
    console.log('Content was updated:', content);
  };

  return (
    <Editor
      apiKey=''
      initialValue="<p>This is the initial content of the editor</p>"
      init={{
        height: 200,
        width: '50%',
        menubar: false,
        plugins: [
          'advlist autolink lists link image charmap print preview anchor',
          'searchreplace visualblocks code fullscreen',
          'insertdatetime media table paste code help wordcount'
        ],
        
        toolbar:
          // eslint-disable-next-line
          'undo redo | formatselect | bold italic backcolor | \
          alignleft aligncenter alignright alignjustify | \
          bullist numlist outdent indent | link | removeformat | help'
      }}
      onEditorChange={handleEditorChange}
    />
  );  
}

export default TinyMceTest;
