var openbem = {
    apikey: "",
    'getlist': function ()
    {
        var result = [];
        var apikeystr = "";
        if (this.apikey != "")
            apikeystr = "?apikey=" + this.apikey;
        $.ajax({url: path + "assessment/list.json" + apikeystr, dataType: 'json', async: false, success: function (data) {
                result = data;
            }});
        if (result == "")
            result = [];
        return result;
    },
    'get': function (id)
    {
        var result = {};
        $.ajax({url: path + "assessment/get.json?id=" + parseInt(id), async: false, success: function (data) {
                result = data;
            }});
        return result;
    },
    'set': function (id, project, callback)
    {
        var inputdata = {};
        for (z in project)
        {
            inputdata[z] = openbem.extract_inputdata(project[z]);
        }
        var result = {};
        $.ajax({type: 'POST', url: path + "assessment/setdata.json", data: "id=" + parseInt(id) + "&data=" + JSON.stringify(inputdata), async: true, success: function (data) {
                callback(data)
            }});
        //console.log(JSON.stringify(inputdata));
    },
    'create': function (name, description)
    {
        var result = 0;
        $.ajax({type: 'GET', url: path + "assessment/create.json", data: "name=" + name + "&description=" + description, async: false, success: function (data) {
                result = data;
            }});
        return result;
    },
    'delete': function (id)
    {
        var result = 0;
        $.ajax({type: 'GET', url: path + "assessment/delete.json", data: "id=" + id, async: false, success: function (data) {
                result = data;
            }});
        return result;
    },
    'set_status': function (id, status)
    {
        var result = 0;
        $.ajax({type: 'GET', url: path + "assessment/setstatus.json", data: "id=" + id + "&status=" + status, async: false, success: function (data) {
                result = data;
            }});
        return result;
    },
    'set_name_and_description': function (id, name, description)
    {
        var result = 0;
        $.ajax({type: 'POST', url: path + "assessment/setnameanddescription.json", data: "id=" + id + "&name=" + name + "&description=" + description, async: false, success: function (data) {
                result = data;
            }});
        return result;
    },
    'upload_images': function (id, form_data, callback)
    {
        var result = false;
        form_data.append("id", id);
        $.ajax({type: 'POST', url: path + "assessment/uploadimages.json", data: form_data, processData: false, contentType: false, async: false, success: function (data) {
                callback(data)
            }});
    },
    'delete_image': function (id, filename, callback)
    {
        var result = false;
        $.ajax({type: 'POST', url: path + "assessment/deleteimage.json", data: "id=" + id + "&filename=" + filename, async: false, success: function (data) {
                callback(data);
            }});
    },
    extract_inputdata: function (data)
    {
        var inputdata = {};
        inputdata.scenario_name = data.scenario_name;
        inputdata.household = data.household;
        inputdata.region = data.region;
        inputdata.altitude = data.altitude
        inputdata.use_custom_occupancy = data.use_custom_occupancy;
        inputdata.custom_occupancy = data.custom_occupancy;
        inputdata.floors = [];
        inputdata.locked = data.locked;

        for (z in data.floors) {
            inputdata.floors[z] = {name: data.floors[z].name, area: data.floors[z].area, height: data.floors[z].height};
        }

        inputdata.fabric = {
            thermal_bridging_yvalue: data.fabric.thermal_bridging_yvalue,
            global_TMP: data.fabric.global_TMP,
            global_TMP_value: data.fabric.global_TMP_value,
            elements: [],
            measures: data.fabric.measures
        };
        for (z in data.fabric.elements) {
            inputdata.fabric.elements[z] = {
                type: data.fabric.elements[z].type,
                name: data.fabric.elements[z].name,
                lib: data.fabric.elements[z].lib,
                subtractfrom: data.fabric.elements[z].subtractfrom,
                l: data.fabric.elements[z].l,
                h: data.fabric.elements[z].h,
                area: data.fabric.elements[z].area,
                uvalue: 1.0 * data.fabric.elements[z].uvalue,
                id: 1.0 * data.fabric.elements[z].id,
                location: data.fabric.elements[z].location || '',
                description: data.fabric.elements[z].description || '',
                kvalue: data.fabric.elements[z].kvalue || '',
                orientation: data.fabric.elements[z].orientation,
                overshading: data.fabric.elements[z].overshading,
                g: data.fabric.elements[z].g || '',
                gL: data.fabric.elements[z].gL || '',
                ff: data.fabric.elements[z].ff || '',
                performance: data.fabric.elements[z].performance || '',
                benefits: data.fabric.elements[z].benefits || '',
                cost: data.fabric.elements[z].cost || '',
                who_by: data.fabric.elements[z].who_by || '',
                disruption: data.fabric.elements[z].disruption || '',
                associated_work: data.fabric.elements[z].associated_work || '',
                notes: data.fabric.elements[z].notes || '',
                maintenance: data.fabric.elements[z].maintenance || ''
            };
            if (data.fabric.elements[z].EWI != undefined)
                inputdata.fabric.elements[z].EWI = data.fabric.elements[z].EWI;
        }

// Ventilation
        inputdata.ventilation = {
            air_permeability_test: data.ventilation.air_permeability_test,
            air_permeability_value: data.ventilation.air_permeability_value,
            dwelling_construction: data.ventilation.dwelling_construction,
            suspended_wooden_floor: data.ventilation.suspended_wooden_floor,
            draught_lobby: data.ventilation.draught_lobby,
            percentage_draught_proofed: data.ventilation.percentage_draught_proofed,
            number_of_sides_sheltered: data.ventilation.number_of_sides_sheltered,
            ventilation_type: data.ventilation.ventilation_type,
            system_air_change_rate: data.ventilation.system_air_change_rate,
            balanced_heat_recovery_efficiency: data.ventilation.balanced_heat_recovery_efficiency,
            IVF: data.ventilation.IVF,
            EVP: data.ventilation.EVP
        };
        // LAC
        inputdata.LAC = {
            LLE: data.LAC.LLE,
            L: data.LAC.L,
            energy_efficient_appliances: data.LAC.energy_efficient_appliances,
            energy_efficient_cooking: data.LAC.energy_efficient_cooking,
            reduced_heat_gains_lighting: data.LAC.reduced_heat_gains_lighting
        };
        inputdata.LAC_calculation_type = data.LAC_calculation_type;
        inputdata.use_generation = data.use_generation;
        inputdata.generation = data.generation;
        inputdata.currentenergy = {
            energyitems: data.currentenergy.energyitems,
            greenenergy: data.currentenergy.greenenergy
        };
        // Waterheating
        //inputdata.use_water_heating = data.use_water_heating;
        inputdata.water_heating = {
            low_water_use_design: data.water_heating.low_water_use_design,
            instantaneous_hotwater: data.water_heating.instantaneous_hotwater,
            solar_water_heating: data.water_heating.solar_water_heating,
            pipework_insulated_fraction: data.water_heating.pipework_insulated_fraction,
            /*declared_loss_factor_known: data.water_heating.declared_loss_factor_known,
             manufacturer_loss_factor: data.water_heating.manufacturer_loss_factor,
             storage_volume: data.water_heating.storage_volume,
             temperature_factor_a: data.water_heating.temperature_factor_a,
             loss_factor_b: data.water_heating.loss_factor_b,
             volume_factor_b: data.water_heating.volume_factor_b,
             temperature_factor_b: data.water_heating.temperature_factor_b,*/
            pipework_insulation: data.water_heating.pipework_insulation,
            storage_type: data.water_heating.storage_type,
            community_heating: data.water_heating.community_heating,
            hot_water_store_in_dwelling: data.water_heating.hot_water_store_in_dwelling,
            contains_dedicated_solar_storage_or_WWHRS: data.water_heating.contains_dedicated_solar_storage_or_WWHRS,
            hot_water_control_type: data.water_heating.hot_water_control_type,
            override_annual_energy_content: data.water_heating.override_annual_energy_content,
            annual_energy_content: data.water_heating.annual_energy_content,
            system: data.water_heating.system,
            storage: data.water_heating.storage,
            combi_boiler: data.water_heating.combi_boiler,
            Vc: data.water_heating.Vc,
            water_usage: data.water_heating.water_usage
        };
        inputdata.use_SHW = data.use_SHW;
        inputdata.SHW = {
            A: data.SHW.A,
            n0: data.SHW.n0,
            a1: data.SHW.a1,
            a2: data.SHW.a2,
            inclination: data.SHW.inclination,
            orientation: data.SHW.orientation,
            overshading: data.SHW.overshading,
            Vs: data.SHW.Vs,
            combined_cylinder_volume: data.SHW.combined_cylinder_volume,
            pump: data.SHW.pump
        };
        // Detailed Appliaces List
        inputdata.appliancelist = {list: []};
        for (z in data.appliancelist.list) {
            inputdata.appliancelist.list[z] = {
                name: data.appliancelist.list[z].name,
                category: data.appliancelist.list[z].category,
                power: data.appliancelist.list[z].power,
                hours: data.appliancelist.list[z].hours
            }
        }

// Apliances CarbonCoop
        inputdata.applianceCarbonCoop = {list: []};
        for (z in data.applianceCarbonCoop.list) {
            inputdata.applianceCarbonCoop.list[z] = {
                category: data.applianceCarbonCoop.list[z].category,
                name: data.applianceCarbonCoop.list[z].name,
                number_used: data.applianceCarbonCoop.list[z].number_used,
                a_plus_rated: data.applianceCarbonCoop.list[z].a_plus_rated,
                norm_demand: data.applianceCarbonCoop.list[z].norm_demand,
                units: data.applianceCarbonCoop.list[z].units,
                utilisation_factor: data.applianceCarbonCoop.list[z].utilisation_factor,
                frequency: data.applianceCarbonCoop.list[z].frequency,
                reference_quantity: data.applianceCarbonCoop.list[z].reference_quantity,
                electric_fraction: data.applianceCarbonCoop.list[z].electric_fraction,
                dhw_fraction: data.applianceCarbonCoop.list[z].dhw_fraction,
                gas_fraction: data.applianceCarbonCoop.list[z].gas_fraction
                        /*primary_energy_total: data.applianceCarbonCoop.list[z].primary_energy_total,
                         primary_energy_m2: data.applianceCarbonCoop.list[z].primary_energy_m2,
                         co2_total: data.applianceCarbonCoop.list[z].co2_total,
                         co2_m2: data.applianceCarbonCoop.list[z].co2_m2*/
            };
        }

// Temperature
        inputdata.temperature = {
            responsiveness: data.temperature.responsiveness,
            target: data.temperature.target,
            control_type: data.temperature.control_type,
            living_area: data.temperature.living_area,
            temperature_adjustment: data.temperature.temperature_adjustment,
            heating_off_summer: data.temperature.heating_off_summer
        };
        // Space heating
        inputdata.space_heating = {
            use_utilfactor_forgains: data.space_heating.use_utilfactor_forgains
        }

// Energy systems
        inputdata.systemlibrary = data.systemlibrary;
        inputdata.energy_systems = {}
        for (z in data.energy_systems) {
            inputdata.energy_systems[z] = [];
            for (i in data.energy_systems[z])
            {
                inputdata.energy_systems[z].push({
                    system: data.energy_systems[z][i].system,
                    description: data.energy_systems[z][i].description,
                    fraction: data.energy_systems[z][i].fraction,
                    efficiency: data.energy_systems[z][i].efficiency,
                    name: data.energy_systems[z][i].name,
                    summer: data.energy_systems[z][i].summer,
                    winter: data.energy_systems[z][i].winter,
                    fuel: data.energy_systems[z][i].fuel,
                    id: 1.0 * data.energy_systems[z][i].id,
                    fans_and_pumps: data.energy_systems[z][i].fans_and_pumps,
                    combi_keep_hot: data.energy_systems[z][i].combi_keep_hot
                });
                if (data.energy_systems[z][i].secondary != undefined) // Secondary heating system
                    inputdata.energy_systems[z][i].secondary = data.energy_systems[z][i].secondary;
            }

        }

        // Fuels
        inputdata.fuels = data.fuels;
        //Images
        inputdata.imagegallery = data.imagegallery;
        inputdata.featuredimage = data.featuredimage;
        //Measures
        inputdata.measures = data.measures;
        return inputdata;
    }
}
