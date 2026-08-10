export function renderText(text) {
  try {
    if (!text.split) return text;
    
    const parts = text.split(/(Atenção,|Atenção)/g);
    let elements = [];
    
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      
      if (part === "Atenção," || part === "Atenção") {
        if (i > 1 || (i === 1 && parts[0].trim() !== "")) elements.push(<span key={`br-${i}-#1`} className={"d-block my-2"}></span>);
        elements.push(<span key={`atencao-${i}`}>{part}</span>);
      }
      
      //
      else if (part) {
        const subParts = part.split(/(\/)/);
        const subElements = subParts.map((subPart, subIndex) => {
          if (subPart === "/") return (<span key={`${i}-${subIndex}`} style={{fontSize: 'inherit', fontFamily: "'Arial', sans-serif"}}>/</span>);
          return subPart;
        });
        
        elements.push(...subElements);
      }
    }
    return elements;
  } catch {
    return text;
  }
}
