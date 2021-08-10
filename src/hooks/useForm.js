import { useEffect, useState } from "react";

export function useForm(initialState, cb = function () {}) {
  const [fields, setFields] = useState(initialState);

  useEffect(() => {
    cb(fields);
  }, [fields]);

  return [
    fields,
    function ({ target }) {
      const field = target.name;
      const value = isNumeric(target.value) ? +target.value : target.value;
      setFields({ ...fields, [field]: value });
    },
    setFields,
  ];
}

function isNumeric(str) {
  if (typeof str != "string") return false; // only strings
  return !isNaN(str) && !isNaN(parseFloat(str));
}
