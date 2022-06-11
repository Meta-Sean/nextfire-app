import { useDocument } from "react-firebase-hooks/firestore";
import { firestore, increment, auth } from "../lib/firebase";

export default function Heart({ postRef }) {
    // Listen to heart document for currently logged in user
    const heartRef = postRef.collection('hearts').doc(auth.currentUser.uid);
    const [heartDoc] = useDocument(heartRef);

    // Create heart function user-to-post relationship
    const addHeart = async () => {
        const uid = auth.currentUser.uid;
        const batch = firestore.batch();

        batch.update(postRef, { heartCount: increment(1) });
        batch.set(heartRef, { uid });

        await batch.commit();
    };

    // Remove heart function user-to-post relationship
    const removeHeart = async () => {
        const batch = firestore.batch();

        batch.update(postRef, { heartCount: increment(-1) });
        batch.delete(heartRef);

        await batch.commit();
    };

  return heartDoc?.exists ?(
      <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
      <button onClick={addHeart}>💗 Heart</button>
  );
}