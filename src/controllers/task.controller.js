const tasksCtrl = {};

const pool = require('../database');

tasksCtrl.renderAddTask = (req, res) => {
    res.render('task/add');
};

tasksCtrl.addTask = async (req, res) => {
    const { title, departamento,tipoid,numeroid,nombre,telefono1,telefono2,correoelectronico,gestante,pertenece_programa,especialidad_formulo_medicamento,fecha_vigencia_formula,md_medicamento,observaciones_enfermera,description,descripciones,done,createAt,md_medicamento_dos,medico_del_caso,remite} = req.body;
    const newTask = {
        title,
        departamento,
        tipoid,
        numeroid,
        nombre,
        telefono1,
        telefono2,
        correoelectronico,
        gestante,
        pertenece_programa,
        especialidad_formulo_medicamento,
        fecha_vigencia_formula,
        md_medicamento,
        observaciones_enfermera,
        description,
        descripciones,
        done,
        createAt,
        md_medicamento_dos,
        medico_del_caso,
        remite,
        user_id: req.user.id
    };
    await pool.query('INSERT INTO tasks set ?', [newTask]);
    req.flash('success_msg', 'Solicitud cargada Satisfactoriamente');
    res.redirect('/tasks/add');
}

tasksCtrl.renderTasks = async (req, res) => {
    const tasks = await pool.query('SELECT * FROM tasks WHERE  done =1', [req.user.id]);
    res.render('/tasks', { tasks });
}



tasksCtrl.deleteLink = async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM tasks WHERE ID = ?', [id]);
    req.flash('success_msg', 'Medicamento Removido Satisfactoriamente');
    res.redirect('/tasks');
};

tasksCtrl.renderEditTask = async (req, res) => {
    const { id } = req.params;
    const tasks = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
    console.log(tasks);
    res.render('tasks/edit_task', {tasks: tasks[0]});
};






tasksCtrl.editTask = async (req,res) => {
    const { id } = req.params;
    const { title, departamento,tipoid,numeroid,nombre,telefono1,telefono2,correoelectronico,gestante,pertenece_programa,especialidad_formulo_medicamento,fecha_vigencia_formula,md_medicamento,observaciones_enfermera,description,descripciones,done,createAt,md_medicamento_dos,medico_del_caso,remite} = req.body; 
    const newTask = {
        title,
        departamento,
        tipoid,
        numeroid,
        nombre,
        telefono1,
        telefono2,
        correoelectronico,
        gestante,
        pertenece_programa,
        especialidad_formulo_medicamento,
        fecha_vigencia_formula,
        md_medicamento,
        observaciones_enfermera,
        description,
        descripciones,
        done,
        createAt,
        md_medicamento_dos,
        medico_del_caso, 
        remite,
    };
    
    
    await pool.query('UPDATE tasks set ? WHERE id = ?', [newTask, id]);
    req.flash('success_msg', 'Medicamento Actualizado Satisfactoriamente');
    res.redirect('/tasks');
}




module.exports = tasksCtrl;