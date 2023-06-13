// JavaScript Document
// Функция для проверки длины строки
				
function CheckLengthString(enterdString, maxLenghtString ){
	if (enterdString.length <= maxLenghtString){
		return true;
		}
	return false;	
}

// Функция проверяет, является ли слово полиндромом
function IsPolindrom(str){
	let len = str.length; 
	let mid = Math.floor(len/2);
		for (let i=0; i < mid; i++ ){
		if (str[i] !== str[len-1-i]) {
		return false};
			}
return true;	
}