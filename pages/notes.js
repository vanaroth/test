import { connectToDatabase } from "../util/mongodb";

export default function Notes({ notes }) {
	return (
		<div>
			<h1>Notes</h1>
			<ul>
				{notes.map((note) => (
					<li key={note._id}>{note.title}</li>
				))}
			</ul>
		</div>
	);
}

export async function getServerSideProps() {
	const { db } = await connectToDatabase();
	const notes = await db.collection("notes").find({}).toArray();
	console.log(notes);
	return {
		props: {
			notes: JSON.parse(JSON.stringify(notes)),
		},
	};
}
