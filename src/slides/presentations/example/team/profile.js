const slide = (name, role, picSrc, title, p1, p2, animParams) => 
`
<div ${animParams} class="profile">
    <div class="basics">
        <img src=${picSrc}>
        <div class="name">${name}</div>
        <div class="role">${role}</div>
    </div>
    <div class="details">
        <h2>${title}</h2>
        <p>${p1}</p>
        <p class="supplement">${p2}</p>
    </div>
</div>
`;

export default slide;