exports.getComponentName = (name) => {
  if (name && name.length > 0) {
    let componentName = name;
    // If contains spaces
    if (name.indexOf('-') > -1) {
      // Replace hyphens with spaces
      name = name.replace(/-/g, ' ');
    }
    if (name.indexOf(' ') > -1) {
      // Split by spaces
      let nameArray = name.split(' ');
      // Capitalize each word
      nameArray = nameArray.map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      });
      // Join words
      componentName = nameArray.join('');
    } else {
      // Capitalize first letter
      componentName = name.charAt(0).toUpperCase() + name.slice(1);
    }
    return componentName;
  } else {
    // Default component name
    return 'MyComponent';
  }
};
