# ─── Vivacity Auth Routes ─────────────────────────────────────────────────────
from fastapi import APIRouter, HTTPException, Header, Depends
import db

router = APIRouter(prefix="/auth", tags=["auth"])

async def get_current_user(authorization: str = Header(None)) -> dict:
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid authorization header")
    
    token = authorization.split(" ")[1]
    user_id = None
    email = ""
    
    try:
        # Verify the token against Supabase Auth
        res = db.get_supabase().auth.get_user(token)
        if not res or not res.user:
            raise HTTPException(status_code=401, detail="Invalid token payload")
        user_id = str(res.user.id)
        email = getattr(res.user, 'email', '') or f"{user_id}@user.supabase"
    except HTTPException:
        raise
    except Exception as e:
        print(f"Auth error: {e}")
        if isinstance(e, RuntimeError):
            raise HTTPException(status_code=500, detail="Server configuration error")
        raise HTTPException(status_code=401, detail=f"Could not validate credentials: {str(e)}")
    
    # Get user profile from public.users table or auto-provision if missing
    user = db.get_user_by_id(user_id)
    if not user:
        try:
            db.get_supabase().table("users").upsert({
                "id": user_id,
                "email": email,
                "provider": "email"
            }).execute()
            user = db.get_user_by_id(user_id)
        except Exception as e:
            print(f"Auto-provision user in public.users failed: {e}")
            
    if not user:
        user = {"id": user_id, "email": email}
        
    return user

@router.get("/me")
def get_me(current_user: dict = Depends(get_current_user)):
    return current_user
