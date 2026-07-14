const data = [{"id":"nodejs","connections":"[\"typescript\",\"nestjs\"]"}];
const parsed = data.map(skill => {
    let pc = [];
    if (typeof skill.connections === 'string') {
        pc = JSON.parse(skill.connections);
    }
    return { ...skill, connections: pc };
});
console.log(parsed);
console.log(Array.isArray(parsed[0].connections));
