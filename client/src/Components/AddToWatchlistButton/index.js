import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../UI/Button/Button";
import {
  addToWatchlist,
  resetShowNotification,
  deleteFromWatchlist,
} from "../../redux/Features/Watchlist/watchlistSlice";
import { showSnackBar } from "../../redux/Features/SnackBar/snackbarSlice";

function Index({ detail }) {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((store) => store.auth.user);
  const { isLoading, watchlist, animeAdded, animeRemoved } = useSelector(
    (state) => state.watchlist
  );
  const { animeId } = detail;

  useEffect(() => {
    if (!watchlist) return;
    const status = watchlist.some((item) => Number(item.animeId) === animeId);
    setIsInWatchlist(status);
  }, [watchlist, detail, animeAdded, animeRemoved]);

  useEffect(() => {
    if (animeAdded) {
      dispatch(showSnackBar({ message: "Anime added to your watchlist." }));
    }
    if (animeRemoved) {
      dispatch(showSnackBar({ message: "Anime removed from your watchlist." }));
    }
    return () => {
      dispatch(resetShowNotification());
    };
  }, [animeAdded, animeRemoved]);

  if (isLoggedIn && isInWatchlist) {
    return (
      <Button
        primary={true}
        isButton={true}
        onClick={() =>
          dispatch(deleteFromWatchlist({ animeId: detail.animeId }))
        }
        disabled={isLoading}
      >
        REMOVE FROM WATCHLIST
      </Button>
    );
  }

  if (isLoggedIn && !isInWatchlist) {
    return (
      <Button
        primary={true}
        isButton={true}
        onClick={() => dispatch(addToWatchlist(detail))}
        disabled={isLoading}
      >
        ADD TO WATCHLIST
      </Button>
    );
  }

  return (
    <Button
      primary={true}
      isButton={true}
      onClick={() =>
        dispatch(
          showSnackBar({
            message: "Please login to add animes to your watchlist.",
          })
        )
      }
    >
      ADD TO WATCHLIST
    </Button>
  );
}

export default Index;
