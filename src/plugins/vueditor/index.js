import { SERVER_URL } from "@/env";

const config = {
  toolbar: [
    "link",
    "unLink",
    "|",
    "picture",
    "|",
    "fullscreen",
    "|",
    "sourceCode",
    "|",
    "bold",
    "italic",
    "strikeThrough",
    "removeFormat",
    "|",
    "insertUnorderedList",
    "insertOrderedList",
    "indent",
    "outdent",
    "|",
    "element"
  ],

  uploadUrl: `${SERVER_URL}/api/images`
};

export default config;
