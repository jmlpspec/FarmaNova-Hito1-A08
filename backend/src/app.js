import express from 'express'; import cors from 'cors'; import {buildDraft} from './services/draftService.js';
const app=express(); app.use(cors()); app.use(express.json({limit:'1mb'}));
app.get('/health',(_req,res)=>res.json({status:'ok'}));
app.post('/api/drafts',(req,res)=>{const {requestId,requesterProfile,question,documents}=req.body??{}; if(!requestId||!requesterProfile||!question||!Array.isArray(documents)) return res.status(400).json({error:'requestId, requesterProfile, question y documents son obligatorios.'}); if(!documents.length)return res.status(422).json({error:'Sin fuentes no se genera borrador.'}); return res.json(buildDraft({requestId,requesterProfile,question,documents}));});
export default app;
