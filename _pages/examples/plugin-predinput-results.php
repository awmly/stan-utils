<?php $data=json_decode($_REQUEST['data']); ?>
<ul>
	<li><b>Passed Variables</b></li>
	<li><code>search</code> The term searched for</li>
	<li><code>data</code> Any passed data as a JSON string</li>
	<?php foreach($data as $var=>$val) print("<li><code>data.".$var."</code> ".$val."</li>"); ?>
</ul>