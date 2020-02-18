FromObjectToJson = object => {

	try {

		if (typeof object !== "object")
			throw "It has to be an object!";

		let json, cierre;
		if (!Array.isArray(object)) {
			json = "{";
			cierre = "}";
		} else {
			json = "[";
			cierre = "]";
		}

		function CicloJSON(objectCiclo, esArray) {

			if (arguments.length === 0) {
				objectCiclo = object;
				esArray = false;
			}
			else {
				objectCiclo = objectCiclo;
				esArray = esArray;
			}

			esArray = Array.isArray(objectCiclo) ? true : esArray;

			for (let i in objectCiclo) {

				let j = 0;
				if (typeof objectCiclo[i] === "object") {

					if (!esArray && !Array.isArray(objectCiclo))
						json += '"' + i + '"' + ":";

					if (Array.isArray(objectCiclo[i])){

						json += "[";

						for (let w in objectCiclo[i]) {

							if (typeof objectCiclo[i][w] !== "object") {
								json += typeof objectCiclo[i][w] != 'number' && typeof objectCiclo[i][w] != 'boolean'
								? '"' + objectCiclo[i][w].toString().replace(/\r?\n/g, "\\n") + '"' : objectCiclo[i][w];
							}
							else {

								if (Array.isArray(objectCiclo[i][w])) {

									json += "[";
									CicloJSON(objectCiclo[i][w], true);
									json = json.substring(json.length-1, json.length) == "," ? json.substring(0, json.length-1) : json;
									json += "]";

								} else if (objectCiclo[i][w] == null) {

									json += null;

								} else {

									json +=  "{";
									CicloJSON(objectCiclo[i][w]);
									json = json.substring(json.length-1, json.length) == "," ? json.substring(0, json.length-1) : json;
									json += "}";

								}

							}

							json += ",";

						}

						json = json.substring(json.length-1, json.length) == "," ? json.substring(0, json.length-1) : json;
						json += "]";

					} else if (objectCiclo[i] == null) {

						json += null;

					} else {

						json += "{";
						CicloJSON(objectCiclo[i]);
						json = json.substring(json.length-1, json.length) == "," ? json.substring(0, json.length-1) : json;
						json += "}";

					}

				} else {

					if (typeof objectCiclo[i] !== "function") {


							if (!esArray)
								json += typeof objectCiclo[i] != 'number' && typeof objectCiclo[i] != 'boolean'
								 ? '"' + i + '"' + ":" + '"' + objectCiclo[i].toString().replace(/\r?\n/g, "\\n") + '"' : '"' + i + '"' + ":" + objectCiclo[i];
							else
								json += typeof objectCiclo[i] != 'number' && typeof objectCiclo[i] != 'boolean'
								 ? '"' + objectCiclo[i].toString().replace(/\r?\n/g, "\\n") + '"' : objectCiclo[i];

					}
				}

				if (typeof objectCiclo[i] !== "function")
					json += ",";
				else
					j++;

			}

		}

		CicloJSON();

		return json.substring(0, json.length - 1) + cierre;

	} catch (error) {
		console.log(error);

	}

}
