<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use Illuminate\Support\Facades\File;

class UsuarioController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getusuarioAll(Request $request)
    {
        $search = $request->input('search'); // 🔍 Obtener parámetro de búsqueda

        $usuarios = Usuario::when($search, function ($query, $search) {
            return $query->where('name', 'like', "%$search%")
                        ->orWhere('email', 'like', "%$search%");
        })
        ->get(); // Ya no se incluye la relación 'juego'

        return response()->json($usuarios, 200);
    }

    public function getusuario($id)
    {
        // Aquí también eliminamos el 'with('juego')'
        $registro = Usuario::find($id);
        return $registro;
    }

    public function getAuth()
    {
        $usuarioId = Auth::id();
        $usuario = Usuario::find($usuarioId);

        return response()->json([
            "isAdmin" => $usuario->id_perfil == 1 ? true : false  // ✅ Devolver booleano
        ], 200);
    }

    public function deleteusuario($id)
    {
        $registro = Usuario::find($id);
        if (is_null($registro)) {
            return response()->json('Data not found', 404);
        }
        $registro->delete();
        return response()->json(['Task deleted successfully.']);
    }

    public function putusuario(Request $request, $id)
    {
        $registro = Usuario::find($id);
        if (is_null($registro)) {
            return response()->json('Data not found', 404);
        }
        $registro->update($request->all());
        $registro->save();
        return response()->json(['Task updated successfully.']);
    }

    public function postusuario(Request $request)
    {
        try {
            $context = $request->all();

            $registro = Usuario::create([
                'name' => $context['name'],
                'password' => md5($context['password']),
                'email' => $context['email'],
            ]);

            return response()->json(['success' => true, 'data' => ['usuario' => $registro]]);
        } catch (\Exception $e) {
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }

    public function login(Request $request)
    {
        // Validar datos
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        // Buscar usuario
        $usuario = Usuario::where('email', $request->email)->first();

        // Comprobar credenciales
        if (!$usuario || md5($request->password) != $usuario->password) {
            return response()->json(['success' => false, 'message' => 'Credenciales incorrectas'], 401);
        }

        // Crear token y devolverlo en la respuesta con la clave 'access_token'
        $token = $usuario->createToken('token')->plainTextToken;

        return response()->json([
            'access_token' => $token,
            'isAdmin'      => $usuario->id_perfil == 1
        ], 200);
    }
}
