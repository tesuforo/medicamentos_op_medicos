const linksCtrl = {};

const pool = require('../database');

linksCtrl.renderAddLink = (req, res) => {
    res.render('links/add');
};

linksCtrl.addLink = async (req, res) => {
    const { title, description,cum,url,laboratorio,estado,medicamentoalternativo1,medicamentoalternativo2,medicamentoalternativo3,} = req.body;
    const newLink = {
        title,
        description,
        url,
        cum,
        laboratorio,
        estado,
        medicamentoalternativo1,
        medicamentoalternativo2,
        medicamentoalternativo3,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO links set ?', [newLink]);
    req.flash('success_msg', 'Medicamento Guardado Satisfactoriamente');
    res.redirect('/links/add');
}

linksCtrl.renderLinks = async (req, res) => {
    const links = await pool.query('SELECT * FROM links WHERE user_id = 20', [req.user.id]);
    res.render('links/list', { links });
}

linksCtrl.renderTasks = async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE  done =1 and respuesta_medico is  null', [req.user.id]);
    res.render('links/tasks', { tasks });
}

linksCtrl.editTask = async (req,res) => {
    const { id } = req.params;
    const {respuesta_medico} = req.body; 
    const newTask = {
        
        respuesta_medico,
    };
    
    
    await pool.query('UPDATE tasks set ? WHERE id = ?', [newTask, id]);
    req.flash('success_msg', 'Solicitud Actualizado Satisfactoriamente');
    res.redirect('/links/tasks');
}


linksCtrl.renderEditTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    console.log(tasks);
    res.render('links/edit_task', {tasks: tasks[0]});
};







linksCtrl.renderLinks_admin = async (req, res) => {
    const links_admin = await pool.query('SELECT * FROM links WHERE user_id = 20', [req.user.id]);
    res.render('links/list_todas', { links_admin });
}



linksCtrl.renderLinks_hospitalario = async (req, res) => {
    const links_hospitalario = await pool.query('SELECT * FROM links WHERE user_id = 20', [req.user.id]);
    res.render('links/list_hospitalario', { links_hospitalario });
}







linksCtrl.renderLinks_ocupadas = async (req, res) => {
    const links_ocupadas = await pool.query('SELECT * FROM links WHERE user_id = 13', [req.user.id]);
    res.render('links/list_ocupadas', { links_ocupadas });


}

linksCtrl.renderLinks_todas_guajira = async (req, res) => {
    const links_todas_guajira = await pool.query('SELECT * FROM links WHERE user_id = 13', [req.user.id]);
    res.render('links/list_todas_guajira', { links_todas_guajira });

    
}


linksCtrl.renderLinks_sedes_disponible = async (req, res) => {
    const links_sedes_disponible = await pool.query('SELECT * FROM links WHERE user_id = 14', [req.user.id]);
    res.render('links/list_sedes_disponible', { links_sedes_disponible });
}

linksCtrl.renderLinks_sedes_disponible_cesar = async (req, res) => {
    const links_sedes_disponible_cesar = await pool.query('SELECT * FROM links WHERE user_id = 14', [req.user.id]);
    res.render('links/list_sedes_disponible_cesar', { links_sedes_disponible_cesar });
}



linksCtrl.renderLinks_observacion = async (req, res) => {
    const links_observacion = await pool.query('SELECT * FROM links WHERE user_id = 10', [req.user.id]);
    res.render('links/list_magdalena', { links_observacion});
}

linksCtrl.renderLinks_observacion_magdalena = async (req, res) => {
    const links_observacion_magdalena = await pool.query('SELECT * FROM links WHERE user_id = 10', [req.user.id]);
    res.render('links/list_todas_magdalena', { links_observacion_magdalena});
}




linksCtrl.deleteLink = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM links WHERE ID = ?', [id]);
    req.flash('success_msg', 'Medicamento Removido Satisfactoriamente');
    res.redirect('/links');
};

linksCtrl.renderEditLink = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit', {link: links[0]});
};

linksCtrl.renderEditLink_egreso = async (req, res) => {
    const { id } = req.params;
    const links = await pool.query('SELECT * FROM links WHERE id = ?', [id]);
    console.log(links);
    res.render('links/edit_egreso', {link: links[0]});
};




linksCtrl.editLink_egreso = async (req,res) => {
    const { id } = req.params;
    const { title, description,cum,url,laboratorio,estado, medicamentoalternativo1,medicamentoalternativo2,medicamentoalternativo3,} = req.body; 
    const newLink = {
        title,
        description,
        url,
        cum,
        laboratorio,
        estado,
        medicamentoalternativo1,
        medicamentoalternativo2,
        medicamentoalternativo3,

    };
    
    
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success_msg', 'Medicamento Actualizado Satisfactoriamente');
    res.redirect('/links');
}

linksCtrl.editLink = async (req,res) => {
    const { id } = req.params;
    const { title, description,cum,url,laboratorio,estado,medicamentoalternativo1,medicamentoalternativo2,medicamentoalternativo3,} = req.body; 
    const newLink = {
        title,
        description,
        url,
        cum,
        laboratorio,
        estado, 
        medicamentoalternativo1,
        medicamentoalternativo2,
        medicamentoalternativo3, 
    };
    
    
    await pool.query('UPDATE links set ? WHERE id = ?', [newLink, id]);
    req.flash('success_msg', 'Medicamento Actualizado Satisfactoriamente');
    res.redirect('/links');
}




module.exports = linksCtrl;