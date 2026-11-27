export type Save = {version:1; hero:string; node:string; flags:string[]; relationships:Record<string,number>; memories:string[]; mastery:Record<string,number>; inventory:string[]};
export type Choice = {id:string; next:string; flag?:string; companion?:string; affinity?:number};
export type Scene = {id:string; text:string; choices:Choice[]};
export const initialSave=(hero:string,node:string):Save=>({version:1,hero,node,flags:[],relationships:{},memories:[],mastery:{},inventory:[]});
export function choose(s:Save,scene:Scene,id:string,world:Record<string,Scene>):Save {
 if(s.node!==scene.id) throw Error('Wrong scene');
 const c=scene.choices.find(x=>x.id===id);
 if(!c||!world[c.next]) throw Error('Invalid choice');
 const relationships={...s.relationships};
 if(c.companion) relationships[c.companion]=Math.max(-100,Math.min(100,(relationships[c.companion]??0)+(c.affinity??0)));
 return {...s,node:c.next,relationships,flags:c.flag?[...new Set([...s.flags,c.flag])]:s.flags,memories:[...s.memories,scene.id+':'+id]};
}
export function learn(s:Save,objective:string,correct:boolean):Save {
 return {...s,mastery:{...s.mastery,[objective]:Math.max(0,Math.min(5,(s.mastery[objective]??0)+(correct?1:-1)))}};
}
export const difficulty=(s:Save,id:string)=>Math.min(3,1+Math.floor((s.mastery[id]??0)/2));
export interface SaveStore {load():Promise<Save|null>; save(state:Save):Promise<void>; clear():Promise<void>}
