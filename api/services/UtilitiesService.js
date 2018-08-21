module.exports = {
	isVowel: function(v){
		return ['a', 'e', 'i', 'o', 'u'].indexOf(v.toLowerCase()) == -1;
	},
}