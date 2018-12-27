const Project = require('../models/Project');

module.exports = {
    index: (req, res) => {
        Project.find().then(projects => {
            projects
                .sort((a,b) => a.budget - b.budget);
            res.render('project/index', {'projects': projects});
        });
    },

    createGet: (req, res) => {
        res.render('project/create');
    },

    createPost: (req, res) => {
        let project = req.body;

        if(project.title === '' || project.description === '') {
            project.error = "Cannot create empty Project! Title or Description is required!";
            return res.render('project/create', project);
        }

        if(project.budget === isNaN || project.budget <= 0 || Number.isInteger(project.budget)) {
            project.error = "Budget must is positive number!";
            return res.render('project/create', project);
        }

        Project.create(project)
            .then(project => {
            res.redirect('/');
            })
            .catch(err => {
                res.render('project/create', project);
            });
    },

    editGet: (req, res) => {
        let projectId = req.params.id;
        Project
            .findById(projectId)
            .then(project => {
                res.render('project/edit', project);
            });
    },

    editPost: (req, res) => {
        let id = req.params.id;
        let project = req.body;

        if(id === null) {
            project.error = "There is no such Project!";
            return res.render('project/edit', project);
        }

        if(project.title === '' || project.description === '') {
            project.error = "Cannot create empty Project! Title or Description is required!";
            return res.render('project/edit', project);
        }

        if(project.budget === isNaN || project.budget <= 0 || Number.isInteger(project.budget)) {
            project.error = "Budget must is positive number!";
            return res.render('project/edit', project);
        }

        Project
            .findByIdAndUpdate(id, project)
            .then(project => {
            res.redirect('/');
        });
    },

    deleteGet: (req, res) => {
        let projectId = req.params.id;
        Project
            .findById(projectId)
            .then(project => {
                if(project) {
                    return res.render('project/delete', project);
                } else {
                    return res.redirect('/');
                }
            })
            .catch(err => res.redirect('/'));
    },

    deletePost: (req, res) => {
        let projectId = req.params.id;

        if(projectId === null) {
            project.error = "There is no such Project!";
            return res.render('project/delete', project);
        }

        Project
            .findByIdAndRemove(projectId)
            .then(project => {
            res.redirect('/');
        }).catch(err => res.redirect('/'));
    }
};