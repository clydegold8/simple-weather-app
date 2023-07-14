function toCamel(s: string) {
  return s.replace(/([-_][a-z0-9])/ig, ($1) => {
      return $1.toUpperCase()
          .replace('-', '')
          .replace('_', '');
  });
}

export function keysToCamel(o: any) : any {
  if (o === Object(o) && !Array.isArray(o) && typeof o !== 'function') {
      const n: any = {};
      Object.keys(o).forEach((k) => {
        n[toCamel(k)] = keysToCamel(o[k]);
      });
      return n;
  } else if (Array.isArray(o)) {
      return o.map((i) => {
          return keysToCamel(i);
      });
  }
  return o;
}
