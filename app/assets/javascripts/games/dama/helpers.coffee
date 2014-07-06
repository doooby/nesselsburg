DAMA.worldPosition = (p) ->
    v = new THREE.Vector3(DAMA.offset_desky.x, DAMA.offset_desky.y,
        DAMA.offset_desky.z)
    c = DAMA.getPoziceCoords(p)
    v.x += (c[0]+0.5)*DAMA.sirka_ctverce
    v.y += (c[1]+0.5)*DAMA.sirka_ctverce
    v
DAMA.poziceByRay = (rayc) ->
    v = rayc.ray.vectorAtZ(0)
    DAMA.poziceByCoords(
        Math.floor((v.x-DAMA.offset_desky.x)/DAMA.sirka_ctverce),
        Math.floor((v.y-DAMA.offset_desky.y)/DAMA.sirka_ctverce))
DAMA.poziceByCoords = (x, y) ->
    return -1 if x<0 || x>7 || y<0 || y>7
    x-=1 if y%2==0
    if x%2==0 then (y*4 + (x/2)) else -1
DAMA.getPoziceCoords = (i) ->
    y = Math.floor(i/4)
    x = (i%4)*2
    x+=1 if y%2==0
    [x, y]
DAMA.krokSmerem = (p, smer) ->
    #0 = sv, 1 = jv, 2 = sz, 3 = jz
    c = DAMA.getPoziceCoords(p)
    if smer%2==0 then c[1]+=1 else c[1]-=1
    if smer<2 then c[0]+=1 else c[0]-=1
    krok = DAMA.poziceByCoords(c[0], c[1])
    krok

DAMA.vypisInfo = (txt, css) ->
    css = 'logg' unless css
    div = $('<div class="'+css+'">'+txt+'</div>')
    $('#printout').append(div)