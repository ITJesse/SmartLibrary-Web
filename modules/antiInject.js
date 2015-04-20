module.exports = function(str){
	var reg=/^\?(.*)(select%20|insert%20|delete%20from%20|count\(|drop%20table|update%20truncate%20|asc\(|mid\(|char\(|xp_cmdshell|exec%20master|net%20localgroup%20administrators|\"|:|net%20user|\|%20or%20)(.*)$/gi;
	var e = reg.test(str);
	if(!e){
		return str;
	}else{
		return false;
	}
};
