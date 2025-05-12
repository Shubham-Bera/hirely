import { jobList, techSkills, nonTechSkills } from "../models/jobPortal.model.js";
import { body, validationResult } from "express-validator";
export default class JobPortalController{

    static renderHomePage(req,res){
        res.render("home",{showSearchBar: false, userEmail: req.session.userEmail, role:req.session.role, userName: req.session.userName});
    }

    static renderJobs(req,res){
        res.render("jobs",{jobList, showSearchBar: true, userEmail: req.session.userEmail, role:req.session.role});
    }

    static renderPostJob(req,res){
        res.render("postJob", {
            showSearchBar: false,
            userEmail: req.session.userEmail,
            role: req.session.role,
            techskills: techSkills,
            nontechskills: nonTechSkills
        });
        
    }
    static renderJobDesc(req,res){     
        const jobId = parseInt(req.params.id);
        const job = jobList.find(j => j.id === jobId);

        if (job) {
            res.render('jobDescription', { job, showSearchBar: false, userEmail: req.session.userEmail, role:req.session.role });
        } else {
            res.status(404).send("Job not found");
        }
    }

    static postJob(req,res){
        console.log(req.headers['content-type']);
        console.log(req.body);
        res.send(req.body);
    }

} 