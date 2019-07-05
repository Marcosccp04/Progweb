/**
 * GameController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
	trex: async function (req, res) {
	res.view('game/trex');
	}

	<div class="container mt-5">
 		<div class="row">
 			<div class="col">
 				<div id="jogo"></div>
 				<button id="iniciar">Iniciar</button>
 			</div>
 		</div>
	</div>
	<input type="hidden" id="_csrf" value="<%= _csrf %>">
	<script src="/jogo/trex.js"></script>
};


