<?php 

defined('EMONCMS_EXEC') or die('Restricted access');
global $path, $emoncms_version, $admin_enable_userlist; 

?><br>
<h2>Admin</h2>

<div style="background-color:#fff">
<table class="table table-striped ">
    <tr>
        <td colspan="2">Emoncms version: <?php echo $emoncms_version; ?></td>
    </tr>
    <?php if ($admin_enable_userlist) { ?>
    <tr>
        <td>
            <h3><?php echo _('Users'); ?></h3>
            <p><?php echo _('Administer user accounts'); ?></p>
        </td>
        <td>
            <a href="<?php echo $path; ?>admin/users" class="btn btn-info"><?php echo _('Users'); ?></a>
        </td>
    </tr>
    <?php } ?>
    <tr>
        <td>
            <h3><?php echo _('Update database'); ?></h3>
            <p><?php echo _('Run this after updating emoncms, after installing a new module or to check emoncms database status.'); ?></p>
        </td>
        <td>
            <a href="<?php echo $path; ?>admin/db" class="btn btn-info"><?php echo _('Update & check'); ?></a>
        </td>
    </tr>
</table>
</div>
